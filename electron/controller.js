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
    /**
     * Verify username and password from Sqlite Database to login into DashBoard
     * @param {Object} event - an object that will send a response back to the ipcRenderer
     * @param {string } username
     * @param {string } password
     * @returns { function} Console log an error message
     */
    async function verifyCredential(event, args) {
        try {
            const auth = await db.verifyLogin(args);
            // event.sender.send(channels.LOGIN, { login: auth });
            auth
                ? event.sender.send(channels.LOGIN, { data: auth })
                : event.sender.send(channels.LOGIN, { error: 'Invalid Login' });
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Add New Membership to Database
     * @param {*} event
     * @param {*} membership
     * @returns
     */
    async function addNewMember(event, membership) {
        const [account, data] = new Membership(membership).record;

        const sendNewMemberRecord = async (data) => {
            const lastRecordId = await db.insert(data);
            const newMembership = await db.getLastRecord(lastRecordId);
            const record = { ...newMembership, type: 'NEW MEMBERSHIP' };
            event.sender.send(channels.ADD, record);
        };

        const sendAccountExistError = (account) => {
            event.sender.send(channels.ADD, {
                error: `${account} already existed`,
            });
        };

        try {
            const duplicate = await db.checkDuplicateAccount(account);
            !duplicate
                ? sendNewMemberRecord(data)
                : sendAccountExistError(account);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find Membership by Phone, Account, and Name
     * @param {Object} event
     * @param {Object} args
     * @returns
     */
    async function findMembership(event, args) {
        console.log('findMembership', args);
        const { phone, account, firstName, lastName } = args;
        const fullname = firstName + '%' + lastName;

        // console.log(fullname);

        const sendFindResult = (data) => {
            console.log(data);
            // event.sender.send(channels.FIND, data);
            event.sender.send(channels.FIND, { data });
        };

        try {
            if (phone && account) {
                sendFindResult(await db.findPhoneAndAccount(phone, account));
            } else if (phone) {
                sendFindResult(await db.findPhone(phone));
            } else if (account) {
                sendFindResult(await db.findByAccount(account));
            } else if (firstName || lastName) {
                sendFindResult(await db.findByFullName(fullname));
            } else {
                sendFindResult({ membership: null });
                event.sender.send(channels.FIND, {
                    error: 'Unable to locate Membership',
                });
            }
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Backup Database
     * @param {*} event
     * @returns
     */
    async function backupDatabase(event) {
        const sendFailSave = () =>
            // event.sender.send(channels.SHOW_BACKUP_DIALOG, { open: false });
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                error: 'Backup',
            });

        const sendSaveSuccess = () =>
            // event.sender.send(channels.SHOW_BACKUP_DIALOG, {
            // open: `${new Date().toLocaleDateString()}`,
            // });
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                data: `${new Date().toLocaleDateString()}`,
            });

        try {
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
            // event.sender.send(channels.SHOW_BACKUP_DIALOG, {
            //     open: 'Backup',
            // });
            else
                event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                    error: 'Backup',
                });
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Buy Water
     * @param {*} event
     * @param {*} buyData
     * @returns
     */
    async function buyWater(event, buyData) {
        const sendBuyData = (record) => {
            event.sender.send(channels.BUY, record);
        };

        try {
            const record = await db.buy(buyData);
            sendBuyData(record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Renew Membership Gallon
     * @param {*} event
     * @param {*} renewData
     */
    async function renewMembership(event, renewData) {
        const sendRenewData = (record) => {
            event.sender.send(channels.RENEW, record);
        };

        try {
            const record = await db.renew(renewData);
            sendRenewData(record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Edit Membership Info
     */
    async function editMembershipInfo(event, newInfo) {
        try {
            const record = await db.edit(newInfo);
            event.sender.send(channels.EDIT, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Get Membership Purchase History
     *
     * @param {Object} event - listen to incoming request for membership history data
     * @param {Object} data - contained queries to get membership purchase history
     * @param {string} data.account - The account of the membership
     * @param {string} data.memberSince- The date the accounted was created
     * @param {string} data.limit - The number of record to return back
     * @param {string} data.offset - The number of record from where the record should start
     *
     * @returns {Function} - A console log if there are error in getting the membership history
     */
    async function getMembershipHistory(event, data) {
        const { account, limit, offset, memberSince } = data;
        try {
            const history = await db.history([
                account,
                memberSince,
                limit,
                offset,
            ]);
            event.sender.send(channels.HISTORY, history);
        } catch (err) {
            return console.log('getMembershipHistory Error:', err.message);
        }
    }

    async function getEverything(event, data) {
        const { account, limit, offset, memberSince } = data;
        try {
            const history = await db.history([
                account,
                memberSince,
                limit,
                offset,
            ]);
            const totalFee = await db.totalFee([account, memberSince]);
            const { totalRenewalGallon } = await db.totalRenew([
                account,
                memberSince,
            ]);
            const { totalBuyGallon } = await db.totalBuy([
                account,
                memberSince,
            ]);
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

    /**
     * Get the number of invoices associated with a given membership account
     *
     * @param {Object} event - listen to request for total account invoice
     * @param {Object} data - contained queries to get total account invoices
     * @param {string} data.account - The account of the membership
     * @param {string} data.memberSince- The date the accounted was created
     *
     * @returns {Function} - A console log if there is an error in getting the total invoices
     */
    async function getTotalAccountInvoices(event, data) {
        const { account, memberSince } = data;
        try {
            const totalInvoice = await db.totalInvoices([account, memberSince]);
            event.sender.send(channels.TOTAL, totalInvoice);
        } catch (err) {
            return console.log('getTotalAccountInvoices Error:', err.message);
        }
    }

    /**
     * Get a new record
     *
     * @param {*} event
     * @returns
     */
    async function getLastRecord(event) {
        try {
            const record = await db.newRecord();
            console.log('getLastRecord', record);
            // event.sender.send(channels.LAST_RECORD, record);
            record
                ? event.sender.send(channels.LAST_RECORD, { data: record })
                : event.sender.send(channels.LAST_RECORD, {
                      error: 'Unable to get last record',
                  });
        } catch (err) {
            return console.log('getLastRecord Error', err.message);
        }
    }

    /**
     * Get totalRenewFee for a membership
     *
     * @param {*} event
     * @param {*} data
     * @returns
     */
    async function getTotalFee(event, data) {
        const { account, memberSince } = data;
        try {
            const totalFee = await db.totalFee([account, memberSince]);
            console.log('totalFee:', totalFee);
            event.sender.send(channels.TOTAL_FEE, {
                totalRenewalFee: totalFee,
            });
        } catch (err) {
            return console.log('getTotalFee', err.message);
        }
    }

    async function getTotalRenewalGallon(event, { account, memberSince }) {
        try {
            const totalRenew = await db.totalRenew([account, memberSince]);
            console.log('totalRenew', totalRenew);
            event.sender.send(channels.TOTAL_RENEW, totalRenew);
        } catch (err) {
            return console.log('getTotalRenewalGallon', err.message);
        }
    }

    async function getTotalBuyGallon(event, { account, memberSince }) {
        try {
            const totalBuy = await db.totalBuy([account, memberSince]);
            console.log('totalBuy', totalBuy);
            event.sender.send(channels.TOTAL_BUY, totalBuy);
        } catch (err) {
            return console.log('getTotalBuyGallon', err.message);
        }
    }

    /**
     * Daily Report
     * @param {*} event
     * @param {*} args
     * @returns
     */
    async function dailyReport(event, args) {
        console.log('getDailyReport Controller', args);
        try {
            const report = await db.getDailyReport(args);
            console.log('dailyReport', report);
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

    /**
     * Print New Membership Receipt
     * @param {*} event
     * @param {*} args
     * @returns
     */
    function newReceipt(event, args) {
        if (device) {
            printAddReceipt(device, printer, args);
            event.sender.send(channels.PRINT_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_RECEIPT, { done: false });
        }
    }
    /**
     * Print Buy Gallon Receipt
     * @param {*} event
     * @param {*} args
     * @returns
     */
    function buyReceipt(event, args) {
        if (device) {
            printBuyReceipt(device, printer, args);
            event.sender.send(channels.PRINT_BUY_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_BUY_RECEIPT, { done: false });
        }
    }
    /**
     * Print Renew Gallon Receipt
     * @param {*} event
     * @param {*} args
     * @returns
     */
    function renewReceipt(event, args) {
        if (device) {
            printRenewReceipt(device, printer, args);
            event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: true });
        } else {
            event.sender.send(channels.PRINT_RENEW_RECEIPT, { done: false });
        }
    }

    async function getUsers(event, _) {
        console.log('getUsers');
        try {
            const users = await db.getAllUsers();
            console.log(users);
            users
                ? event.sender.send(channels.GET_USERS, { data: users })
                : event.sender.send(channels.GET_USERS, {
                      error: 'Unable To Get User',
                  });
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Add new user
     * @param {*} event
     * @param {*} args
     */
    async function addUser(event, args) {
        console.log('controller: addUser', args);
        try {
            const result = await db.addUser(args);
            // event.sender.send(channels.ADD_USER, result);
            result
                ? event.sender.send(channels.ADD_USER, { data: result })
                : event.sender.send(channels.ADD_USER, {
                      error: 'Unable to add user',
                  });
        } catch (err) {
            return console.log(err.message);
            // event.sender.send(channels.ADD_USER, err);
            // event.sender.send(channels.ADD_USER, err);
        }
    }
    async function deleteUser(event, args) {
        try {
            const result = await db.deleteUser(args);
            event.sender.send(channels.DELETE_USER, result);
        } catch (err) {
            event.sender.send(channels.DELETE_USER, err);
        }
    }
    async function editUser(event, args) {
        try {
            const result = await db.editUser(args);
            event.sender.send(channels.EDIT_USER, result);
        } catch (err) {
            event.sender.send(channels.EDIT_USER, err);
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

    return {
        deleteMembership,
        editUser,
        deleteUser,
        addUser,
        getUsers,
        newReceipt,
        buyReceipt,
        renewReceipt,
        verifyCredential,
        addNewMember,
        findMembership,
        backupDatabase,
        buyWater,
        renewMembership,
        editMembershipInfo,
        getMembershipHistory,
        getTotalAccountInvoices,
        getLastRecord,
        getTotalFee,
        getTotalRenewalGallon,
        getTotalBuyGallon,
        getEverything,
        dailyReport,
    };
};
