import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { channels } from '../../shared/constants';
import api from '../MPW-POS/api';
const { ipcRenderer } = window;

export const StoreContext = createContext(null);
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
export const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 9) return onlyNums;
    return onlyNums.slice(0, 9);
};

/**
 * API to make request to Electron Backend SQLite Database
 * @param {*} message
 * @param {*} values
 * @returns
 */
export const send = (message, values) =>
    new Promise((resolve, reject) => {
        console.log('send', { message, values });
        ipcRenderer.send(message, values);
        ipcRenderer.on(message, (_, { error, data }) => {
            ipcRenderer.removeAllListeners(message);
            error ? reject(error) : resolve(data);
        });
    });

const Store = ({ children, history }) => {
    const [error, setError] = useState(false);

    const login = async (values) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await send(channels.LOGIN, values),
            });
            return values;
        } catch (err) {
            setError(err);
            document.getElementById('username').focus();
            throw err;
        }
    };

    const close = async () => {
        console.log('closeApp');
        setInterval(ipcRenderer.send(channels.CLOSE_APP), 500);
    };

    const store = {
        error,
        setError,
        history,
        api,
        sleep,
        login,
        send,
        close,
        channels,
        normalize: {
            phone: normalizePhone,
            account: normalizeAccount,
        },
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
