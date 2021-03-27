const { channels } = require('../../src/shared/constants');
const { printSenterDailyReport, printReceipt } = require('../printer');
const usbDetect = require('usb-detection');
const fs = require('fs');

module.exports = (db) => {
    const options = { encoding: 'GB18030' /* default */ };
    // POS PRINTER SETUP
    // let escpos;
    // let device;
    // let printer;

    /**
     * Verify username and password from Sqlite Database to login into DashBoard
     * @param {Object} event - an object that will send a response back to the ipcRenderer
     * @param {string } username
     * @param {string } password
     * @returns { function} Console log an error message
     */
    async function authenticate(event, { username, password }) {
        try {
            console.log('authenticate:', { username, password });
            const auth = await db.verifyLogin({ username, password });
            console.log('authenticate result:', auth);
            event.sender.send(channels.LOGIN, { login: auth });
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find a membership last record using their account number
     * @param {*} event
     * @param {*} account
     * @returns
     */
    async function findAccount(event, account) {
        try {
            const record = await db.getAccount(account);
            event.sender.send(channels.SENTER_FIND_ACCOUNT, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find membership by First Name
     * @param {*} event
     * @param {*} name
     * @returns
     */
    async function findFirstName(event, name) {
        try {
            const record = await db.getFirstName(name);
            event.sender.send(channels.SENTER_FIND_FIRST_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find Membership by Last Name
     *
     * @param {*} event
     * @param {*} name
     * @returns
     */
    async function findLastName(event, name) {
        try {
            const record = await db.getLastName(name);
            event.sender.send(channels.SENTER_FIND_LAST_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find Membership by Phone
     *
     * @param {*} event
     * @param {*} phone
     * @returns
     */
    async function findPhone(event, phone) {
        try {
            const record = await db.getPhone(phone);
            event.sender.send(channels.SENTER_FIND_PHONE, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Find Membership using both First Name and Last Name
     * @param {*} event
     * @param {*} data
     * @returns
     */
    async function findBothName(event, data) {
        try {
            const record = await db.getBothName(data);
            event.sender.send(channels.SENTER_FIND_BOTH_NAME, record);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     *
     * @param {*} event
     * @param {*} data
     * @returns
     */
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

    /**
     * ADD NEw MEMBERSHIP TO SQLITE DATABASE
     */
    async function addNewMembership(event, args) {
        console.log('addNewMember incoming data: ', args);
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

    /**
     * ADD NEW WATER PURCHASE TO SQLIte DATABASE
     *
     * @param {*} event
     * @param {*} args
     */
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

    /**
     * Print Buy Receipt
     */
    async function print(event, args) {
        console.log('printBuy', args);
        try {
            usbDetect.find().then((devices) => {
                devices.forEach((item) => {
                    if (item.deviceName === 'USB Printing Support') {
                        const escpos = require('escpos');
                        escpos.USB = require('escpos-usb');
                        const device = new escpos.USB();
                        const printer = new escpos.Printer(device, options);
                        if (device) {
                            printReceipt(device, printer, args);
                            event.sender.send(channels.SENTER_PRINT, {
                                done: true,
                            });
                        } else {
                            event.sender.send(channels.SENTER_PRINT, {
                                done: false,
                            });
                        }
                    }
                });
            });
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Get Account History
     *
     * @param {*} event
     * @param {*} account
     * @returns
     */
    async function history(event, account) {
        try {
            const records = await db.getHistory(account);
            event.sender.send(channels.SENTER_ACCOUNT_HISTORY, records);
        } catch (err) {
            return console.log(err.message);
        }
    }

    /**
     * Back up Database
     * @param {*} event
     * @returns
     */
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

    /**
     * EDIT MEMBERSHIP NAME AND PHONE
     *
     * @param {*} event
     * @param {*} data
     */
    async function editMembership(event, args) {
        const { account, phone, first, last } = args;

        try {
            const records = await db.edit([first, last, phone, account]);
            event.sender.send(channels.SENTER_EDIT, records);
        } catch (err) {
            console.log(err.message);
        }
    }

    /**
     * DELETE A MEMBERSHIP FROM DATABASE
     */
    async function deleteMembership(event, { account, password }) {
        try {
            const result = await db.remove(account, password);
            event.sender.send(channels.SENTER_DELETE, result);
        } catch (err) {
            console.log(err.message);
        }
    }

    /**
     * Controller Object
     */
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
