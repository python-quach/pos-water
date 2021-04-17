import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

/**
 * LOGIN
 * @param {*} param0
 * @returns
 */
export const login = ({ password, username }) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.LOGIN, { username, password });
        ipcRenderer.on(channels.LOGIN, (_, { login }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (!login) reject('Invalid Login');
            resolve(login);
        });
    });
};

export const backup = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.SHOW_BACKUP_DIALOG);
        ipcRenderer.on(channels.SHOW_BACKUP_DIALOG, (_, response) => {
            ipcRenderer.removeAllListeners(channels.SHOW_BACKUP_DIALOG);
            if (!response.open) reject(response.open);
            else resolve(response);
        });
    });
};

export const find = ({ phone, account, firstName, lastName }) => {
    console.log('find', { phone, account, firstName, lastName });
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

const api = {
    find,
    login,
    backup,
    closeApp,
    lastRecord,
};

export default api;
