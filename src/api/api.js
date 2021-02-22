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
    ipcRenderer.on(channels.FIND, (_, data) => {
        ipcRenderer.removeAllListeners(channels.FIND);
        console.log(data);
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
        callback(response);
    });
};

// Renew Gallon
export const renew = (data, callback) => {
    ipcRenderer.send(channels.RENEW, data);
    ipcRenderer.on(channels.RENEW, (_, response) => {
        ipcRenderer.removeAllListeners(channels.RENEW);
        callback(response);
    });
};

// History
export const history = ({ account, limit, offset }, callback) => {
    ipcRenderer.send(channels.HISTORY, { account, limit, offset });
    ipcRenderer.on(channels.HISTORY, (_, response) => {
        ipcRenderer.removeAllListeners(channels.HISTORY);
        callback(response);
    });
};

// Total Invoices
export const totalInvoices = ({ account }, callback) => {
    ipcRenderer.send(channels.TOTAL, { account });
    ipcRenderer.on(channels.TOTAL, (_, response) => {
        ipcRenderer.removeAllListeners(channels.TOTAL);
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

// GET DAILY REPORT
export const getDailyReport = (date, time, callback) => {
    ipcRenderer.send(channels.REPORT, { date, time });
    ipcRenderer.on(channels.REPORT, (event, response) => {
        ipcRenderer.removeAllListeners(channels.REPORT);
        callback(response);
    });
};

// CLOSE ELECTRON APP
export const closeApp = () => {
    ipcRenderer.send(channels.CLOSE_APP);
};

// BACKUP UP SQLITE FILE
export const backup = (callback) => {
    ipcRenderer.send(channels.SHOW_BACKUP_DIALOG);
    ipcRenderer.on(channels.SHOW_BACKUP_DIALOG, (event, response) => {
        ipcRenderer.removeAllListeners(channels.SHOW_BACKUP_DIALOG);
        callback(response);
    });
};

// PRINT RECEIPT
export const print = (data, callback) => {
    ipcRenderer.send(channels.PRINT_RECEIPT, data);
    ipcRenderer.on(channels.PRINT_RECEIPT, (_, response) => {
        ipcRenderer.removeAllListeners(channels.PRINT_RECEIPT);
        callback(response);
    });
};

// PRINT BUY RECEIPT
export const printBuyReceipt = (data, callback) => {
    console.log('API BUY PRINT:', data);
    ipcRenderer.send(channels.PRINT_BUY_RECEIPT, data);
    ipcRenderer.on(channels.PRINT_BUY_RECEIPT, (_, response) => {
        ipcRenderer.removeAllListeners(channels.PRINT_BUY_RECEIPT);
        callback(response);
    });
};

export const printRenewReceipt = (data, callback) => {
    console.log('API RENEW PRINT:', data);
    ipcRenderer.send(channels.PRINT_RENEW_RECEIPT, data);
    ipcRenderer.on(channels.PRINT_RENEW_RECEIPT, (_, response) => {
        ipcRenderer.removeAllListeners(channels.PRINT_RENEW_RECEIPT);
        callback(response);
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
    getDailyReport,
    closeApp,
    backup,
    printBuyReceipt,
    printRenewReceipt,
    print,
};
