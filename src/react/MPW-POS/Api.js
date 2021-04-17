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

export const closeApp = () => {
    console.log('closeApp');
    ipcRenderer.send(channels.CLOSE_APP);
};

const api = {
    login,
    backup,
    closeApp,
};

export default api;
