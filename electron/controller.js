const fs = require('fs');
const Membership = require('./model/membership');
const { channels } = require('../src/shared/constants');

module.exports = (db) => {
    /**
     * Verify username and password from Sqlite Database to login into DashBoard
     * @param {Object} event - an object that will send a response back to the ipcRenderer
     * @param {string } username
     * @param {string } password
     * @returns { function} Console log an error message
     */
    async function verifyCredential(event, { username, password }) {
        try {
            const auth = await db.verifyLogin({ username, password });
            event.sender.send(channels.LOGIN, { login: auth });
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
        const { phone, account, firstName, lastName } = args;
        const fullname = firstName + '%' + lastName;

        const sendFindResult = (data) => {
            event.sender.send(channels.FIND, data);
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
            event.sender.send(channels.SHOW_BACKUP_DIALOG, { open: false });

        const sendSaveSuccess = () =>
            event.sender.send(channels.SHOW_BACKUP_DIALOG, {
                open: `backup-${new Date().toLocaleDateString()}.sqlite3`,
            });

        try {
            const saveSetting = {
                properties: ['openFile', 'multiSelections'],
                defaultPath: `membership.sqlite3`,
                filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
            };

            const saveFile = await db.backupFile(saveSetting);
            if (saveFile) {
                fs.copyFile(db.dbFile, saveFile, (err) =>
                    err ? sendFailSave() : sendSaveSuccess()
                );
            }
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
            event.sender.send(channels.LAST_RECORD, record);
        } catch (err) {
            return console.logo('getLastRecord Error', err.message);
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

    /**
     * Controller Object
     */
    return {
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
    };
};
