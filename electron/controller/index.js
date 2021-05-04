const { channels } = require('../../src/shared/constants');
const { printSenterDailyReport, printReceipt } = require('../printer');
const usbDetect = require('usb-detection');
const fs = require('fs');

module.exports = (db) => {
    const options = { encoding: 'GB18030' /* default */ };

    async function authenticate(event, { username, password }) {
        try {
            const auth = await db.verifyLogin({ username, password });
            event.sender.send(channels.LOGIN, auth);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findAccount(event, account) {
        try {
            const record = await db.getAccount(account);
            event.sender.send(channels.SENTER_FIND_ACCOUNT, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findFirstName(event, name) {
        try {
            const record = await db.getFirstName(name);
            event.sender.send(channels.SENTER_FIND_FIRST_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findLastName(event, name) {
        try {
            const record = await db.getLastName(name);
            event.sender.send(channels.SENTER_FIND_LAST_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findPhone(event, phone) {
        try {
            const record = await db.getPhone(phone);
            event.sender.send(channels.SENTER_FIND_PHONE, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findBothName(event, data) {
        try {
            const record = await db.getBothName(data);
            event.sender.send(channels.SENTER_FIND_BOTH_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function dailyReport(event, data) {
        try {
            const report = await db.getDailyReport(data);
            usbDetect.find().then(function (devices) {
                devices.forEach(function (item) {
                    if (item.deviceName === 'USB Printing Support') {
                        const escpos = require('escpos');
                        escpos.USB = require('escpos-usb');
                        const device = new escpos.USB();
                        const printer = new escpos.Printer(device, options);
                        printSenterDailyReport(device, printer, report);
                        event.sender.send(channels.SENTER_REPORT, report);
                    }
                });
            });
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function addNewMembership(event, args) {
        const {
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time,
            previous,
        } = args;

        const data = [
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time,
            previous,
        ];
        try {
            const record = await db.insertMembership(data);
            event.sender.send(channels.SENTER_ADD, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function buyWater(event, args) {
        const {
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time,
            previous,
        } = args;

        const data = [
            account,
            phone,
            first,
            last,
            since,
            fee,
            gallon,
            buy,
            remain,
            type,
            date,
            time,
            previous,
        ];
        try {
            const record = await db.insertBuy(data);
            event.sender.send(channels.SENTER_BUY, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function findPrinter() {
        return new Promise((resolve, reject) => {
            usbDetect.find().then((devices) => {
                const data = devices.filter((item) => {
                    if (item.deviceName === 'USB Printing Support') {
                        const escpos = require('escpos');
                        escpos.USB = require('escpos-usb');
                        const device = new escpos.USB();
                        const printer = new escpos.Printer(device, options);
                        resolve({ device, printer });
                        return { device, printer };
                    } else {
                        return null;
                    }
                });
                if (data.length === 1) {
                    resolve(data[0]);
                } else {
                    reject('No Device found');
                }
            });
        });
    }

    async function print(event, args) {
        try {
            const { device, printer } = await findPrinter();
            printReceipt(device, printer, args);
            event.sender.send(channels.SENTER_PRINT, {
                done: true,
            });
        } catch (err) {
            event.sender.send(channels.SENTER_PRINT, {
                done: false,
            });
        }
    }

    async function history(event, account) {
        try {
            const records = await db.getHistory(account);
            event.sender.send(channels.SENTER_ACCOUNT_HISTORY, records);
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function backup(event) {
        try {
            const { dbFile, filePath, open } = await db.getDbFile();
            if (dbFile && filePath) {
                fs.copyFile(dbFile, filePath, (err) => {
                    if (err) throw err;
                    event.sender.send(channels.SENTER_BACKUP, { open });
                });
            } else {
                event.sender.send(channels.SENTER_BACKUP, { open });
            }
        } catch (err) {
            return console.log(err.message);
        }
    }

    async function editMembership(event, args) {
        console.log(args);
        const { originalAccount, account, phone, first, last } = args;

        try {
            const records = await db.edit([
                first,
                last,
                phone,
                account,
                originalAccount,
            ]);
            event.sender.send(channels.SENTER_EDIT, records);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function deleteMembership(event, { account, password }) {
        try {
            const result = await db.remove(account, password);
            event.sender.send(channels.SENTER_DELETE, result);
        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        authenticate,
        findPhone,
        findAccount,
        findFirstName,
        findLastName,
        findBothName,
        dailyReport,
        addNewMembership,
        buyWater,
        print,
        history,
        backup,
        editMembership,
        deleteMembership,
        usbDetect,
    };
};
