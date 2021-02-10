import { channels } from '../shared/constants';
const { ipcRenderer } = window;

export const login = ({ password, username }, callback) => {
    ipcRenderer.send(channels.LOGIN, { username, password });
    ipcRenderer.on(channels.LOGIN, (_, { login }) => {
        ipcRenderer.removeAllListeners(channels.LOGIN);
        callback(login);
    });
};

export const find = ({ phone, account, firstName, lastName }, callback) => {
    ipcRenderer.send(channels.FIND, { phone, account, firstName, lastName });
    ipcRenderer.on(channels.FIND, (_, { membership }) => {
        ipcRenderer.removeAllListeners(channels.FIND);
        console.table(membership);
        callback(membership);
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
        console.log(response);
        callback(response);
    });
};

// Renew Gallon
export const renew = (data, callback) => {
    ipcRenderer.send(channels.RENEW, data);
    ipcRenderer.on(channels.RENEW, (_, response) => {
        ipcRenderer.removeAllListeners(channels.RENEW);
        console.log(response);
        callback(response);
    });
};

// History
export const history = ({ account, limit, offset }, callback) => {
    ipcRenderer.send(channels.HISTORY, { account, limit, offset });
    ipcRenderer.on(channels.HISTORY, (_, response) => {
        ipcRenderer.removeAllListeners(channels.HISTORY);
        console.table(response);
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
};
