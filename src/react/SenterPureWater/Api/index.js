import { channels } from '../../../shared/constants';
const { ipcRenderer } = window;

export const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.LOGIN, { username, password });
        ipcRenderer.on(channels.LOGIN, (_, auth) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (auth) resolve(auth);
            reject({ message: 'Invalid Login' });
        });
    });
};

export const accountHistory = (account) => {
    return new Promise((resolve) => {
        ipcRenderer.send(channels.SENTER_ACCOUNT_HISTORY, account);
        ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
            resolve(args);
        });
    });
};

export function findPhone(phone) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_PHONE, phone);
        ipcRenderer.on(channels.SENTER_FIND_PHONE, async (_, data) => {
            ipcRenderer.removeAllListeners(channels.SENTER_FIND_PHONE);
            if (data.account) {
                const { account } = data.account;
                const history = await accountHistory(account);
                resolve({ history: history, record: data.account });
            } else if (data.accounts) {
                resolve({ history: null, records: data.accounts });
            } else {
                reject({ message: 'phone' });
            }
        });
    });
}

export function findAccount(account) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_ACCOUNT, account);
        ipcRenderer.on(
            channels.SENTER_FIND_ACCOUNT,
            async (_, lastAccountRecord) => {
                ipcRenderer.removeAllListeners(channels.SENTER_FIND_ACCOUNT);
                if (!lastAccountRecord) reject({ message: 'account' });
                const history = await accountHistory(account);
                resolve({ history: history, record: lastAccountRecord });
            }
        );
    });
}

export function findFirstName(firstName) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_FIRST_NAME, firstName);
        ipcRenderer.on(channels.SENTER_FIND_FIRST_NAME, async (_, data) => {
            ipcRenderer.removeAllListeners(channels.SENTER_FIND_FIRST_NAME);
            if (data.account && data.account.account) {
                const { account } = data.account;
                const history = await accountHistory(account);
                resolve({ history: history, record: data.account });
            } else if (data.accounts) {
                resolve({ history: null, records: data.accounts });
            } else {
                reject({ message: 'firstName' });
            }
        });
    });
}

export function findLastName(lastName) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_LAST_NAME, lastName);
        ipcRenderer.on(channels.SENTER_FIND_LAST_NAME, async (_, data) => {
            ipcRenderer.removeAllListeners(channels.SENTER_FIND_LAST_NAME);
            if (data.account && data.account.account) {
                const { account } = data.account;
                const history = await accountHistory(account);
                resolve({ history: history, record: data.account });
            } else if (data.accounts) {
                resolve({ history: null, records: data.accounts });
            } else {
                reject({ message: 'lastName' });
            }
        });
    });
}

export function findBothNames(firstName, lastName) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_FIND_BOTH_NAME, {
            first: firstName,
            last: lastName,
        });
        ipcRenderer.on(channels.SENTER_FIND_BOTH_NAME, async (_, data) => {
            ipcRenderer.removeAllListeners(channels.SENTER_FIND_BOTH_NAME);
            if (data.account && data.account.account) {
                const { account } = data.account;
                const history = await accountHistory(account);
                resolve({ history: history, record: data.account });
            } else if (data.accounts) {
                resolve({ history: null, records: data.accounts });
            } else {
                reject({ message: 'firstName' });
            }
        });
    });
}

export const editMembership = ({
    account,
    first,
    last,
    phone,
    originalAccount,
}) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_EDIT, {
            account,
            first,
            last,
            phone,
            originalAccount,
        });
        ipcRenderer.on(channels.SENTER_EDIT, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_EDIT);
            if (args) {
                resolve(args);
            } else {
                reject('unable to edit user');
            }
        });
    });
};

export const backup = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_BACKUP);
        ipcRenderer.on(channels.SENTER_BACKUP, (_, response) => {
            ipcRenderer.removeAllListeners(channels.SENTER_BACKUP);
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
            ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (_, data) => {
                ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
                if (!data) reject('Unable to renew ');
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
            ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (_, data) => {
                ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
                if (!data) reject('Unable to buy');
                resolve({ history: data, record: args });
            });
        });
    });
};

export const add = (values) => {
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
        ipcRenderer.on(channels.SENTER_ACCOUNT_HISTORY, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_ACCOUNT_HISTORY);
            if (!args) reject('Unable to get History');
            resolve(args);
        });
    });
};

export const getDailyReport = (date, time, callback) => {
    ipcRenderer.send(channels.SENTER_REPORT, { date, time });
    ipcRenderer.on(channels.REPORT, (_, response) => {
        ipcRenderer.removeAllListeners(channels.SENTER_REPORT);
        callback(response);
    });
};

export const closeApp = (e) => {
    e.preventDefault();
    ipcRenderer.send(channels.SENTER_CLOSE);
};

export const deleteMembership = async ({ account, password }) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SENTER_DELETE, { account, password });
        ipcRenderer.on(channels.SENTER_DELETE, (_, args) => {
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

export async function findMembership(queries) {
    return new Promise(async (resolve, reject) => {
        const { phone, account, first, last } = queries;
        try {
            if (phone) resolve(await findPhone(phone));
            else if (account) resolve(await findAccount(account));
            else if (first && !last) resolve(await findFirstName(first));
            else if (last && !first) resolve(await findLastName(last));
            else if (first && last) resolve(await findBothNames(first, last));
            else throw new Error('Please enter a search value');
        } catch (err) {
            reject(err);
        }
    });
}

const api = {
    add,
    login,
    backup,
    closeApp,
    findMembership,
    deleteMembership,
    getDailyReport,
};

export default api;
