const fs = require('fs');
const Membership = require('./model/membership');
const { channels } = require('../src/shared/constants');
const usbDetect = require('usb-detection');
const {
    printAddReceipt,
    printBuyReceipt,
    printRenewReceipt,
    printDailyReport,
} = require('./printer');

// POS PRINTER SETUP
const options = { encoding: 'GB18030' /* default */ };
let escpos;
let device;
let printer;

usbDetect.startMonitoring();
usbDetect
    .find()
    .then(function (devices) {
        devices.forEach(function (item) {
            if (item.deviceName === 'USB Printing Support') {
                escpos = require('escpos');
                escpos.USB = require('escpos-usb');
                setTimeout(function () {
                    device = new escpos.USB();
                    printer = new escpos.Printer(device, options);
                }, 500);
            }
        });
    })
    .catch(function (err) {
        escpos = null;
        device = null;
        printer = null;
    });

usbDetect.on('add', function () {
    usbDetect
        .find()
        .then(function (devices) {
            devices.forEach(function (item) {
                if (item.deviceName === 'USB Printing Support') {
                    console.log('add', item);
                    escpos = require('escpos');
                    escpos.USB = require('escpos-usb');
                    setTimeout(function () {
                        device = new escpos.USB();
                        printer = new escpos.Printer(device, options);
                    }, 500);
                }
            });
        })
        .catch(function () {
            escpos = null;
            device = null;
            printer = null;
        });
});

module.exports = (db) => {
    // const controller = {
    //     create: {
    //         user: async (event, args) => {
    //             try {
    //                 const data = await db.addUser(args);
    //                 const error = 'Create User Error';
    //                 data
    //                     ? event.sender.send(channels.ADD_USER, { data })
    //                     : event.sender.send(channels.ADD_USER, { error });
    //             } catch (err) {
    //                 return console.log(err.message);
    //             }
    //         },
    //         membership: async (event, args) => {},
    //     },
    //     read: {
    //         user: async (event, args) => {},
    //         membership: async (event, args) => {},
    //     },
    //     update: {
    //         membership: async (event, args) => {},
    //         user: async (event, args) => {},
    //     },
    //     delete: {
    //         membership: async (event, args) => {},
    //     },
    // };

    async function verifyCredential(event, args) {
        try {
            console.log('controller: verifyCredential', args);
            const data = await db.verifyLogin(args);
            data
                ? event.sender.send(channels.LOGIN, { data })
                : event.sender.send(channels.LOGIN, { error: 'Invalid Login' });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function addNewMembership(event, args) {
        try {
            const [account, data] = new Membership(args).record;
            console.log('controller: addNewMembership', args);

            const duplicate = await db.checkDuplicateAccount(account);
            if (!duplicate) {
                const lastRecordId = await db.insert(data);
                const newMembership = await db.getLastRecord(lastRecordId);
                const record = { ...newMembership, type: 'NEW MEMBERSHIP' };
                event.sender.send(channels.ADD, { data: record });
            } else {
                const error = `${account} already existed`;
                event.sender.send(channels.ADD, { error });
            }
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findMembership(event, args) {
        const sendFindResult = (data) => {
            event.sender.send(channels.FIND, { data });
        };

        try {
            console.log('controller: findMembership ', args);
            const { phone, account, firstName, lastName } = args;
            const fullname = firstName + '%' + lastName;

            if (phone && account) {
                sendFindResult(await db.findPhoneAndAccount(phone, account));
            } else if (phone) {
                sendFindResult(await db.findPhone(phone));
            } else if (account) {
                sendFindResult(await db.findByAccount(account));
            } else if (firstName || lastName) {
                sendFindResult(await db.findByFullName(fullname));
            } else {
                const error = 'Unable to locate Membership';
                event.sender.send(channels.FIND, { error });
            }
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function backupDatabase(event) {
        const sendFailSave = () =>
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                error: 'Backup',
            });

        const sendSaveSuccess = () =>
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                data: `${new Date().toLocaleDateString()}`,
            });

        try {
            console.log('controller: backupDatabase');
            const saveSetting = {
                properties: ['openFile', 'multiSelections'],
                defaultPath: `membership.sqlite3`,
                filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
            };
            const saveFile = await db.backupFile(saveSetting);

            if (saveFile)
                fs.copyFile(db.dbFile, saveFile, (err) =>
                    err ? sendFailSave() : sendSaveSuccess()
                );
            else sendFailSave();
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function buyWater(event, args) {
        try {
            console.log('controller: buyWater', args);
            const data = await db.buy(args);
            data
                ? event.sender.send(channels.BUY, { data })
                : event.sender.send({ error: 'Buy Error' });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function renewMembership(event, args) {
        try {
            const data = await db.renew(args);
            data
                ? event.sender.send(channels.RENEW, { data })
                : event.sender.send({ error: 'Renew Error' });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function editMembershipInfo(event, args) {
        try {
            console.log('controller: editMembershipInfo', args);
            const data = await db.edit(args);
            const error = 'Edit Error';
            data
                ? event.sender.send(channels.EDIT, { data })
                : event.sender.send(channels.EDIT, { error });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function getEverything(event, args) {
        const { account, limit, offset, memberSince } = args;
        const query = [account, memberSince];
        try {
            const history = await db.history([
                account,
                memberSince,
                limit,
                offset,
            ]);
            const totalFee = await db.totalFee(query);
            const { totalRenewalGallon } = await db.totalRenew(query);
            const { totalBuyGallon } = await db.totalBuy(query);
            event.sender.send(channels.ALL_HISTORY, {
                history,
                totalRenewalFee: totalFee,
                totalRenew: totalRenewalGallon,
                totalBuy: totalBuyGallon,
            });
        } catch (err) {
            return console.log('getMembershipHistory Error:', err.message);
        }
    }

    async function getHistory(event, args) {
        console.log('controller: getHistory', args);
        try {
            const { account, limit, offset, memberSince } = args;
            const historyQuery = [account, memberSince, limit, offset];
            const totalQuery = [account, memberSince];
            const history = await db.history(historyQuery);
            const totalFee = await db.totalFee(totalQuery);
            const { totalRenewalGallon } = await db.totalRenew(totalQuery);
            const { totalBuyGallon } = await db.totalBuy(totalQuery);

            const data = {
                history,
                totalRenewalFee: totalFee,
                totalRenew: totalRenewalGallon,
                totalBuy: totalBuyGallon,
            };

            event.sender.send(channels.ALL_HISTORY, { data });
        } catch (err) {
            event.sender.send(channels.ALL_HISTORY, { error: 'History Error' });
            return console.log('getHistory', err.message);
        }
    }

    async function getTotalAccountInvoices(event, args) {
        console.log('controller: getTotalAccountInvoices', args);
        try {
            const { account, memberSince } = args;
            const data = await db.totalInvoices([account, memberSince]);
            const error = 'Total Invoices Error';
            data
                ? event.sender.send(channels.TOTAL, { data })
                : event.sender.send(channels.TOTAL, { error });
        } catch (err) {
            return console.log('getTotalAccountInvoices Error:', err.message);
        }
    }

    async function getLastRecord(event) {
        console.log('controller: getLastRecord');
        try {
            const data = await db.newRecord();
            const error = 'Unable to get last record';
            data
                ? event.sender.send(channels.LAST_RECORD, { data })
                : event.sender.send(channels.LAST_RECORD, { error });
        } catch (err) {
            return console.log('getLastRecord Error', err.message);
        }
    }

    async function getTotalFee(event, args) {
        console.log('controller: getTotalFee', args);
        try {
            const { account, memberSince } = args;
            const totalFee = await db.totalFee([account, memberSince]);
            const data = { totalRenewalFee: totalFee };

            event.sender.send(channels.TOTAL_FEE, { data });
        } catch (err) {
            event.sender.send(channels.TOTAL_FEE, { error: 'Total Fee Error' });
            return console.log('getTotalFee', err.message);
        }
    }

    async function getTotalRenewalGallon(event, args) {
        console.log('controller: getTotalRenewGallon', args);
        try {
            const { account, memberSince } = args;
            const query = [account, memberSince];
            const data = await db.totalRenew(query);
            const error = 'Total Renewal Gallon Error';
            data
                ? event.sender.send(channels.TOTAL_RENEW, { data })
                : event.sender.send(channels.TOTAL_RENEW, { error });
        } catch (err) {
            return console.log('getTotalRenewalGallon', err.message);
        }
    }

    async function getTotalBuyGallon(event, args) {
        console.log('controller: getTotalBuyGallon', args);
        try {
            const { account, memberSince } = args;
            const query = [account, memberSince];
            const data = await db.totalBuy(query);
            const error = 'Total Buy Gallon Error';
            data
                ? event.sender.send(channels.TOTAL_BUY, { data })
                : event.sender.send(channels.TOTAL_BUY, { error });
        } catch (err) {
            return console.log('getTotalBuyGallon', err.message);
        }
    }

    async function dailyReport(event, args) {
        console.log('controller: dailyReport', args);

        try {
            const report = await db.getDailyReport(args);
            if (device) {
                printDailyReport(device, printer, report);
                event.sender.send(channels.REPORT, report);
            } else {
                event.sender.send(channels.REPORT, report);
            }
        } catch (err) {
            event.sender.send(channels.REPORT, err);
            return console.log('getDailyReport', err.message);
        }
    }

    function newReceipt(event, args) {
        if (device) {
            printAddReceipt(device, printer, args);
            event.sender.send(channels.PRINT_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_RECEIPT, { done: false });
        }
    }

    function buyReceipt(event, args) {
        if (device) {
            printBuyReceipt(device, printer, args);
            event.sender.send(channels.PRINT_BUY_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_BUY_RECEIPT, { done: false });
        }
    }

    function renewReceipt(event, args) {
        if (device) {
            printRenewReceipt(device, printer, args);
            event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: false });
        }
    }

    async function deleteMembership(event, args) {
        try {
            const result = await db.deleteAccount(args);
            event.sender.send(channels.DELETE_ACCOUNT, {
                delete: true,
                result: result,
            });
        } catch (err) {
            event.sender.send(channels.DELETE_ACCOUNT, { delete: false });
        }
    }

    async function getUsers(event, _) {
        console.log('controller getUsers');
        const error = 'Unable to Get Users';
        try {
            const data = await db.getAllUsers();
            data
                ? event.sender.send(channels.GET_USERS, { data })
                : event.sender.send(channels.GET_USERS, { error });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function addUser(event, args) {
        console.log('controller: addUser', args);
        const error = 'Unable to Add User';
        try {
            const result = await db.addUser(args);
            result
                ? event.sender.send(channels.ADD_USER, { data: result })
                : event.sender.send(channels.ADD_USER, { error });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function deleteUser(event, args) {
        console.log('controller: deleteUser', args);
        const error = 'Unable to delete user';
        try {
            const data = await db.deleteUser(args);
            data
                ? event.sender.send(channels.DELETE_USER, { data })
                : event.sender.send(channels.DELETE_USER, { error });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function editUser(event, args) {
        console.log('controller: editUser', args);
        const error = 'Unable to Edit User';
        try {
            const data = await db.editUser(args);
            data
                ? event.sender.send(channels.EDIT_USER, { data })
                : event.sender.send(channels.EDIT_USER, { error });
        } catch (err) {
            event.sender.send(channels.EDIT_USER, err);
        }
    }

    return {
        addNewMembership,
        deleteMembership,
        editUser,
        deleteUser,
        addUser,
        getUsers,
        newReceipt,
        buyReceipt,
        renewReceipt,
        verifyCredential,
        findMembership,
        backupDatabase,
        buyWater,
        renewMembership,
        editMembershipInfo,
        getTotalAccountInvoices,
        getLastRecord,
        getTotalFee,
        getTotalRenewalGallon,
        getTotalBuyGallon,
        getEverything,
        dailyReport,
        getHistory,
        // controller,
    };
};
