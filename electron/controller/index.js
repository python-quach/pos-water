const { channels } = require('../../src/shared/constants');

module.exports = (db, device, printer, printSenterDailyReport) => {
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
            console.log(device, printer);
            if (device) {
                printSenterDailyReport(device, printer, report);
            }
            event.sender.send(channels.SENTER_REPORT, report);
        } catch (err) {
            return console.log(err.message);
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
    };
};
