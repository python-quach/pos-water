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

export const closeApp = () => {
    console.log('closeApp');
    ipcRenderer.send(channels.CLOSE_APP);
};

const api = {
    login,
    closeApp,
};

export default api;
