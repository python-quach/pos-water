import { channels } from '../shared/constants';
const { ipcRenderer } = window;

const login = ({ password, username }, callback) => {
    ipcRenderer.send(channels.LOGIN, { username, password });
    ipcRenderer.on(channels.LOGIN, (event, { login }) => {
        ipcRenderer.removeAllListeners(channels.LOGIN);
        callback(login);
    });
};

const find = ({ phone, account, firstName, lastName }, callback) => {
    ipcRenderer.send(channels.FIND, { phone, account, firstName, lastName });
    ipcRenderer.on(channels.FIND, (event, { membership }) => {
        ipcRenderer.removeAllListeners(channels.FIND);
        console.table(membership);
        callback(membership);
    });
};

export const api = {
    login,
    find,
};
