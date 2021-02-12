import { channels } from '../shared/constants';
const { ipcRenderer } = window;

export const login = ({ password, username }, callback) => {
    ipcRenderer.send(channels.LOGIN, { username, password });
    ipcRenderer.on(channels.LOGIN, (_, { login }) => {
        ipcRenderer.removeAllListeners(channels.LOGIN);
        callback(login);
    });
};

// Add Membership
export const add = (data, callback) => {
    console.table([{ ...data }]);
    ipcRenderer.send(channels.ADD, data);
    ipcRenderer.on(channels.ADD, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.ADD);
        console.table(arg);
        callback(arg);
    });
};

// Find Membership
export const find = ({ phone, account, firstName, lastName }, callback) => {
    console.log('Find', phone, account, firstName, lastName);
    ipcRenderer.send(channels.FIND, { phone, account, firstName, lastName });
    // ipcRenderer.on(channels.FIND, (_, { membership }) => {
    ipcRenderer.on(channels.FIND, (_, data) => {
        ipcRenderer.removeAllListeners(channels.FIND);
        // console.log(membership);
        console.log(data);
        // console.table(membership);
        // We need to check of there are many accounts with the search
        // console.table(membership);
        callback(data);
    });
};

export const buy = (data, callback) => {
    ipcRenderer.send(channels.BUY, data);
    ipcRenderer.on(channels.BUY, (_, response) => {
        ipcRenderer.removeAllListeners(channels.BUY);
        callback(response);
    });
};

// Edit Membership:
export const edit = (data, callback) => {
    ipcRenderer.send(channels.EDIT, data);
    ipcRenderer.on(channels.EDIT, (_, response) => {
        ipcRenderer.removeAllListeners(channels.EDIT);
        // console.log(response);
        callback(response);
    });
};

// Renew Gallon
export const renew = (data, callback) => {
    ipcRenderer.send(channels.RENEW, data);
    ipcRenderer.on(channels.RENEW, (_, response) => {
        ipcRenderer.removeAllListeners(channels.RENEW);
        // console.log(response);
        callback(response);
    });
};

// History
export const history = ({ account, limit, offset }, callback) => {
    ipcRenderer.send(channels.HISTORY, { account, limit, offset });
    ipcRenderer.on(channels.HISTORY, (_, response) => {
        ipcRenderer.removeAllListeners(channels.HISTORY);
        // console.table(response);
        callback(response);
    });
};

// Total Invoices
export const totalInvoices = ({ account }, callback) => {
    ipcRenderer.send(channels.TOTAL, { account });
    ipcRenderer.on(channels.TOTAL, (_, response) => {
        ipcRenderer.removeAllListeners(channels.TOTAL);
        // console.log({ response });
        callback(response);
    });
};

// Last Record
export const lastRecord = (callback) => {
    ipcRenderer.send(channels.LAST_RECORD);
    ipcRenderer.on(channels.LAST_RECORD, (_, response) => {
        ipcRenderer.removeAllListeners(channels.LAST_RECORD);
        console.log({ response });
        callback(response);
    });
};

// GET TOTAL RENEWAL FEE
export const getTotalRenewalFee = (account, callback) => {
    console.log('total fee', account);
    ipcRenderer.send(channels.TOTAL_FEE, { account });
    ipcRenderer.on(channels.TOTAL_FEE, (_, response) => {
        ipcRenderer.removeAllListeners(channels.TOTAL_FEE);
        const { totalRenewalFee } = response;
        callback(totalRenewalFee);
    });
};

// GET TOTAL RENEWAL GALLON
export const getTotalRenewalGallon = (account, callback) => {
    ipcRenderer.send(channels.TOTAL_RENEW, { account });
    ipcRenderer.on(channels.TOTAL_RENEW, (_, response) => {
        ipcRenderer.removeAllListeners(channels.TOTAL_RENEW);
        const { totalRenewalGallon } = response;
        callback(totalRenewalGallon);
    });
};

// GET TOTAL BUY GALLON
export const getTotalBuyGallon = (account, callback) => {
    ipcRenderer.send(channels.TOTAL_BUY, { account });
    ipcRenderer.on(channels.TOTAL_BUY, (_, response) => {
        ipcRenderer.removeAllListeners(channels.TOTAL_BUY);
        const { totalBuyGallon } = response;
        callback(totalBuyGallon);
    });
};

export const api = {
    login,
    find,
    buy,
    edit,
    renew,
    history,
    totalInvoices,
    lastRecord,
    totalFee: getTotalRenewalFee,
    totalRenew: getTotalRenewalGallon,
    totalBuy: getTotalBuyGallon,
};
