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

    const TransitionEffect = {
        pulse: {
            animation: 'pulse',
            duration: 500,
        },
    };

    const LoginComponent = {
        transition: {
            animation: 'pulse',
            duration: 500,
        },
        button: {
            login: (setVisible) => {
                return {
                    type: 'submit',
                    content: !error ? 'Login' : error,
                    color: !error ? 'blue' : 'red',
                    size: 'huge',
                    icon: 'sign-in',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                    onClick: () => setVisible((visible) => !visible),
                };
            },
            admin: (setVisible) => {
                return {
                    content: 'Admin',
                    type: 'button',
                    color: 'yellow',
                    size: 'huge',
                    icon: 'database',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                    onClick: () => {
                        setVisible((prev) => !prev);
                        open.admin();
                    },
                };
            },
            close: (setVisible) => {
                return {
                    content: 'Close',
                    type: 'button',
                    color: 'black',
                    size: 'huge',
                    icon: 'close',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                    onClick: () => api.close(setVisible),
                };
            },
            backup: (setVisible) => {
                return {
                    content: fileSave,
                    loading: loading,
                    type: 'button',
                    size: 'huge',
                    icon: 'save',
                    circular: true,
                    color: 'pink',
                    fluid: true,
                    onClick: () => api.backup(setVisible),
                };
            },
        },
    };
    // Helpers
    const helpers = {
        field: {
            resetError: (input, value) => {
                setError(false);
                return input.onChange(value);
            },
        },
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
                const result = await send(channels.LOGIN, values);
                console.log(result);
                history.push({
                    pathname: '/dashboard',
                    state: result,
                });
            } catch (err) {
                setError(err);
                throw err;
            }
        },
        close: async (setVisible) => {
            setVisible((visible) => !visible);
            await helpers.sleep(500);
            send(channels.CLOSE_APP);
        },
        backup: async (setVisible) => {
            setVisible((visible) => !visible);
            await helpers.sleep(500);
            try {
                setLoading(true);
                setFileSave(await send(channels.SHOW_BACKUP_DIALOG));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setFileSave(err);
            }
        },
    };

    const open = {
        admin: async () => {
            await helpers.sleep(500);
            history.push({
                pathname: '/admin/confirm',
                state: { open: true },
            });
        },
    };

    // FIELD HELPERS
    const resetError = (input, value) => {
        setError(false);
        return input.onChange(value);
    };

    const store = {
        open,
        api,
        error,
        button: {
            login: LoginComponent.button.login,
            admin: LoginComponent.button.admin,
            close: LoginComponent.button.close,
            backup: LoginComponent.button.backup,
        },
        effect: {
            pulse: LoginComponent.transition,
        },
        TransitionEffect,
        resetError,
        setError,
        history,
        helpers,
        loading,
        fileSave,
        channels,
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
