import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

export const StoreContext = createContext(null);

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

    // Backup States
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState('Backup');

    // Helpers
    const helpers = {
        sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
        normalize: {
            phone: (value) => {
                if (!value) return value;
                const onlyNums = value.replace(/[^\d]/g, '');
                if (onlyNums.length <= 3) return onlyNums;
                if (onlyNums.length <= 6) return onlyNums;
                return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
            },
            account: (value) => {
                if (!value) return value;
                const onlyNums = value.replace(/[^\d]/g, '');
                if (onlyNums.length <= 9) return onlyNums;
                return onlyNums.slice(0, 9);
            },
        },
    };

    // API
    const api = {
        login: async (values) => {
            try {
                await helpers.sleep(500);
                history.push({
                    pathname: '/dashboard',
                    state: await send(channels.LOGIN, values),
                });
                return values;
            } catch (err) {
                setError(err);
                throw err;
            }
        },
        close: async () => {
            setInterval(send(channels.CLOSE_APP), 500);
        },
        backup: async () => {
            setLoading(true);
            try {
                setFileSave(await send(channels.SHOW_BACKUP_DIALOG));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setFileSave(err);
            }
        },
    };

    const openAdminScreen = () => {
        setTimeout(() => {
            history.push({
                pathname: '/admin/confirm',
                state: true,
            });
        }, 500);
    };

    const open = {
        admin: openAdminScreen,
    };

    const store = {
        open,
        api,
        error,
        setError,
        history,
        helpers,
        send,
        loading,
        fileSave,
        channels,
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
