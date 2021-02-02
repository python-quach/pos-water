import { channels } from '../shared/constants';
const { ipcRenderer } = window;

const login = async ({ password, username }, callback) => {
    ipcRenderer.send(channels.LOGIN, { username, password });
    ipcRenderer.on(channels.LOGIN, (event, { login }) => {
        ipcRenderer.removeAllListeners(channels.LOGIN);
        callback(login);
    });
};

export const api = {
    login,
};
