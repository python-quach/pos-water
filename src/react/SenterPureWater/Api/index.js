import { channels } from '../../../shared/constants';
const { ipcRenderer } = window;

export const edit = ({ account, first, last, phone }) => {
    console.log('edit:', { account, first, last, phone });
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_EDIT, { account, first, last, phone });
        ipcRenderer.on(channels.SENTER_EDIT, (event, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_EDIT);
            console.log(args);
            if (args) {
                console.log('Edit User Last Record', args);
                resolve(args);
            } else {
                reject('unable to edit user');
            }
        });
    });
};

export const login = ({ username, password }) => {
    console.log('login: ', { username, password });
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.LOGIN, { username, password });
        ipcRenderer.on(channels.LOGIN, (_, { login }) => {
            console.log('Response from API', login);
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (login) {
                resolve(login);
            } else {
                reject(login);
            }
        });
    });
};

export const backup = () => {
    return new Promise((resolve, reject) => {
        console.log('Backup Database');
        ipcRenderer.send(channels.SENTER_BACKUP);
        ipcRenderer.on(channels.SENTER_BACKUP, (event, response) => {
            ipcRenderer.removeAllListeners(channels.SENTER_BACKUP);
            console.log('Backup Response:', response);
            if (!response.open) {
                reject(response.open);
            } else {
                resolve(response);
            }
        });
    });
};

export const renew = (values) => {
    return new Promise((resolve, reject) => {
        const renew = {
            ...values,
            remain: values.gallon + values.remain,
            type: 'RENEW',
        };
        ipcRenderer.send(channels.SENTER_BUY, renew);
        ipcRenderer.on(channels.SENTER_BUY, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_BUY);
            ipcRenderer.send(channels.SENTER_ACCOUNT_HISTORY, values.account);
            ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (event, data) => {
                ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
                resolve({ history: data, record: args });
            });
        });
    });
};

export const buy = (values) => {
    return new Promise((resolve, reject) => {
        const buy = {
            ...values,
            type: 'BUY',
        };
        ipcRenderer.send(channels.SENTER_BUY, buy);
        ipcRenderer.on(channels.SENTER_BUY, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_BUY);

            ipcRenderer.send(channels.SENTER_ACCOUNT_HISTORY, values.account);
            ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (event, data) => {
                ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
                resolve({ history: data, record: args });
            });
        });
    });
};

export const add = (values) => {
    console.log('values', values);
    const { account } = values;
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_ADD, values);
        ipcRenderer.on(channels.SENTER_ADD, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_ADD);
            if (args.error) {
                reject(args.error);
            } else {
                ipcRenderer.send(channels.SENTER_ACCOUNT_HISTORY, account);
                ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (_, data) => {
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_ACCOUNT_HISTORY
                    );
                    resolve({
                        history: data,
                        record: args,
                        openBuy: true,
                        openAdd: false,
                    });
                });
            }
        });
    });
};

export const getHistory = async (account) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_ACCOUNT_HISTORY, account);
        ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (event, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
            resolve(args);
        });
    });
};

export const findPhone = async ({ phone }) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_PHONE, phone);
        ipcRenderer.on(channels.SENTER_FIND_PHONE, async (_, data) => {
            console.log(data);
            if (data.account) {
                const history = await getHistory(data.account.account);
                resolve({ history, record: data.account });
            } else if (data.accounts) {
                resolve({
                    history: null,
                    record: data.accounts,
                });
            } else {
                reject('There are not account with the phone number', phone);
            }
        });
    });
};

export const getDailyReport = (date, time, callback) => {
    ipcRenderer.send(channels.SENTER_REPORT, { date, time });
    ipcRenderer.on(channels.REPORT, (event, response) => {
        ipcRenderer.removeAllListeners(channels.SENTER_REPORT);
        callback(response);
    });
};

export const closeApp = () => {
    ipcRenderer.send(channels.SENTER_CLOSE);
};

export const deleteMembership = async ({ account, password }) => {
    console.log(account, password);
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_DELETE, { account, password });
        ipcRenderer.on(channels.SENTER_DELETE, (event, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_DELETE);
            const { auth, status } = args;
            if (auth && status) {
                resolve(args);
            } else {
                reject(args);
            }
        });
    });
};
