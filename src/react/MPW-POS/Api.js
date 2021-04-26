import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

export const login = (values) =>
    new Promise((resolve, reject) => {
        ipcRenderer.send(channels.LOGIN, values);
        ipcRenderer.on(channels.LOGIN, (_, { error, data }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            error ? reject(error) : resolve(data);
        });
    });

export const getUsers = () =>
    new Promise((resolve, reject) => {
        ipcRenderer.send(channels.GET_USERS);
        ipcRenderer.on(channels.GET_USERS, (_, arg) => {
            ipcRenderer.removeAllListeners(channels.GET_USERS);
        });
    });

export const sendRequest = (message, values) =>
    new Promise((resolve, reject) => {
        ipcRenderer.send(message, values);
        ipcRenderer.on(message, (_, { error, data }) => {
            ipcRenderer.removeAllListeners(message);
            error ? reject(error) : resolve(data);
        });
    });

export const backup = () =>
    new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SHOW_BACKUP_DIALOG);
        ipcRenderer.on(channels.SHOW_BACKUP_DIALOG, (_, response) => {
            ipcRenderer.removeAllListeners(channels.SHOW_BACKUP_DIALOG);
            !response.open ? reject(response.open) : resolve(response);
        });
    });

export const find = ({ phone, account, firstName, lastName }) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.FIND, {
            phone,
            account,
            firstName,
            lastName,
        });
        ipcRenderer.on(channels.FIND, (_, data) => {
            ipcRenderer.removeAllListeners(channels.FIND);
            if (!data) reject(data);
            resolve(data);
        });
    });
};
export const lastRecord = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.LAST_RECORD);
        ipcRenderer.on(channels.LAST_RECORD, (_, response) => {
            ipcRenderer.removeAllListeners(channels.LAST_RECORD);
            if (!response) reject('Unable to find last record');
            resolve(response);
        });
    });
};
export const closeApp = () => {
    console.log('closeApp');
    ipcRenderer.send(channels.CLOSE_APP);
};
export const history = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.ALL_HISTORY, data);
        ipcRenderer.on(channels.ALL_HISTORY, (_, response) => {
            ipcRenderer.removeAllListeners(channels.ALL_HISTORY);
            resolve(response);
        });
    });
};
export const getDailyReport = (date, time) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.REPORT, { date, time });
        ipcRenderer.on(channels.REPORT, (_, response) => {
            ipcRenderer.removeAllListeners(channels.REPORT);
            if (!response) reject('Unable to get daily report');
            resolve(response);
        });
    });
};
export const add = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.ADD, data);
        ipcRenderer.on(channels.ADD, (_, arg) => {
            ipcRenderer.removeAllListeners(channels.ADD);
            if (!arg) reject('Unable to add new membership');
            resolve(arg);
        });
    });
};
export const buy = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.BUY, data);
        ipcRenderer.on(channels.BUY, (_, response) => {
            ipcRenderer.removeAllListeners(channels.BUY);
            if (!response) reject('Unable to make purchase');
            resolve(response);
        });
    });
};
export const renew = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.RENEW, data);
        ipcRenderer.on(channels.RENEW, (_, response) => {
            ipcRenderer.removeAllListeners(channels.RENEW);
            if (!response) reject('Unable to renew');
            resolve(response);
        });
    });
};
export const totalFee = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.TOTAL_FEE, data);
        ipcRenderer.on(channels.TOTAL_FEE, (_, response) => {
            ipcRenderer.removeAllListeners(channels.TOTAL_FEE);
            const { totalRenewalFee } = response;
            resolve(totalRenewalFee);
        });
    });
};
export const totalRenew = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.TOTAL_RENEW, data);
        ipcRenderer.on(channels.TOTAL_RENEW, (_, response) => {
            ipcRenderer.removeAllListeners(channels.TOTAL_RENEW);
            const { totalRenewalGallon } = response;
            resolve(totalRenewalGallon);
        });
    });
};
export const totalBuy = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.TOTAL_BUY, data);
        ipcRenderer.on(channels.TOTAL_BUY, (_, response) => {
            ipcRenderer.removeAllListeners(channels.TOTAL_BUY);
            const { totalBuyGallon } = response;
            resolve(totalBuyGallon);
        });
    });
};
export const totalInvoices = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.TOTAL, data);
        ipcRenderer.on(channels.TOTAL, (_, response) => {
            ipcRenderer.removeAllListeners(channels.TOTAL);
            resolve(response);
        });
    });
};

const api = {
    find,
    login,
    backup,
    closeApp,
    lastRecord,
    history,
    getDailyReport,
    buy,
    renew,
    add,
    totalInvoices,
    totalFee,
    totalBuy,
    totalRenew,
    sendRequest,
};

export default api;
