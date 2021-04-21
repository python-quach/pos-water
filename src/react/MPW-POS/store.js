import { useState, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

export const StoreContext = createContext(null);

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
    // Button Error
    const [error, setError] = useState(false);

    // Backup States
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState('Backup');

    // LOGIN SCREEN COMPONENT
    const LoginComponent = {
        screen: {
            width: {
                style: {
                    maxWidth: 450,
                },
            },
            close: {
                closeOnDocumentClick: false,
                closeOnEscape: false,
                closeOnDimmerClick: false,
                closeOnPortalMouseLeave: false,
            },
            segment: {
                style: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                },
            },
            grid: {
                textAlign: 'center',
                verticalAlign: 'middle',
                style: {
                    height: '100vh',
                },
            },
            header: {
                title: 'Mckee Pure Water',
                content: 'Version 1.0',
            },
        },
        button: {
            login: () => {
                return {
                    type: 'submit',
                    content: !error ? 'Login' : error,
                    color: !error ? 'blue' : 'red',
                    size: 'huge',
                    icon: 'sign-in',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            admin: () => {
                return {
                    content: 'Admin',
                    type: 'button',
                    color: 'yellow',
                    size: 'huge',
                    icon: 'database',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            close: () => {
                return {
                    content: 'Close',
                    type: 'button',
                    color: 'black',
                    size: 'huge',
                    icon: 'close',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            backup: () => {
                return {
                    disabled: loading,
                    content: fileSave,
                    loading: loading,
                    type: 'button',
                    size: 'huge',
                    icon: 'save',
                    circular: true,
                    color: 'pink',
                    fluid: true,
                };
            },
        },
        field: {
            username: (input) => {
                return {
                    ...input,
                    id: 'username',
                    type: 'text',
                    placeholder: 'username',
                    className: 'blueIcon',
                    size: 'massive',
                    icon: 'user circle',
                    iconPosition: 'left',
                    autoComplete: 'off',
                    spellCheck: 'false',
                    inverted: true,
                    transparent: true,
                    fluid: true,
                    focus: true,
                    onChange: (_, { value }) => {
                        helpers.field.resetError(input, value);
                    },
                };
            },
            password: (input) => {
                return {
                    ...input,
                    id: 'password',
                    type: 'password',
                    placeholder: 'password',
                    className: 'blueIcon',
                    size: 'massive',
                    icon: 'lock',
                    iconPosition: 'left',
                    autoComplete: 'off',
                    spellCheck: 'false',
                    inverted: true,
                    transparent: true,
                    fluid: true,
                    focus: true,
                    onChange: (_, { value }) => {
                        helpers.field.resetError(input, value);
                    },
                };
            },
        },
    };

    const AdminComponent = {
        screen: {
            width: {
                style: {
                    maxWidth: 450,
                },
            },
            close: {
                closeOnDocumentClick: false,
                closeOnEscape: false,
                closeOnDimmerClick: false,
                closeOnPortalMouseLeave: false,
            },
            segment: {
                style: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                },
            },
            grid: {
                textAlign: 'center',
                verticalAlign: 'middle',
                style: {
                    height: '100vh',
                },
            },
            header: {
                title: 'Mckee Pure Water',
                content: 'Version 1.0',
            },
        },
        button: {},
        field: {},
    };

    const DashboardComponent = {
        screen: {
            width: {
                style: {
                    maxWidth: 450,
                },
            },
            close: {
                closeOnDocumentClick: false,
                closeOnEscape: false,
                closeOnDimmerClick: false,
                closeOnPortalMouseLeave: false,
            },
            segment: {
                style: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                },
            },
            grid: {
                textAlign: 'center',
                verticalAlign: 'middle',
                style: {
                    height: '100vh',
                },
            },
            header: {
                title: 'Mckee Pure Water',
                content: 'Version 1.0',
            },
        },
        button: {
            find: () => {
                return {
                    id: 'FindMembership',
                    content: 'Find Membership',
                    color: 'blue',
                    type: 'submit',
                    size: 'huge',
                    icon: 'search',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            add: () => {
                return {
                    id: 'AddButton',
                    content: 'New Membership',
                    type: 'button',
                    size: 'huge',
                    color: 'teal',
                    icon: 'add circle',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            report: () => {
                return {
                    id: 'ReportButton',
                    content: `Daily Report: ${new Date().toLocaleDateString()}`,
                    type: 'button',
                    color: 'yellow',
                    size: 'huge',
                    icon: 'calendar',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
            logout: () => {
                return {
                    content: 'Logout',
                    type: 'button',
                    id: 'LogoutButton',
                    size: 'huge',
                    color: 'black',
                    icon: 'sign-out',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                };
            },
        },
        field: {
            phone: (input, form) => {
                return {
                    className: 'blueIcon',
                    id: 'phone',
                    placeholder: 'xxx-xxxx',
                    focus: true,
                    type: 'text',
                    size: 'massive',
                    icon: 'whatsapp',
                    fluid: true,
                    iconPosition: 'left',
                    transparent: true,
                    value: input.value,
                    name: input.name,
                    onFocus: () => {
                        form.change('account', '');
                        form.change('firstName', '');
                        form.change('lastName', '');
                    },
                    onChange: (e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    },
                };
            },
            account: (input, form) => {
                return {
                    className: 'blueIcon',
                    id: 'account',
                    type: 'text',
                    placeholder: 'account #',
                    size: 'massive',
                    focus: true,
                    fluid: true,
                    icon: 'credit card',
                    iconPosition: 'left',
                    transparent: true,
                    spellCheck: 'false',
                    inverted: true,
                    value: input.value,
                    name: input.name,
                    onFocus: () => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('firstName', '');
                            form.change('lastName', '');
                        });
                    },
                    onChange: (e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    },
                };
            },
            firstName: (input, form) => {
                return {
                    placeholder: 'first name',
                    className: 'blueIcon',
                    icon: 'user circle',
                    iconPosition: 'left',
                    size: 'massive',
                    spellCheck: 'false',
                    fluid: true,
                    focus: true,
                    transparent: true,
                    inverted: true,
                    value: input.value,
                    name: input.name,
                    onFocus: () => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('account', '');
                        });
                    },
                    onChange: (e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    },
                };
            },
            lastName: (input, form) => {
                return {
                    placeholder: 'last name',
                    className: 'blueIcon',
                    icon: 'user circle',
                    iconPosition: 'left',
                    size: 'massive',
                    spellCheck: 'false',
                    fluid: true,
                    focus: true,
                    transparent: true,
                    inverted: true,
                    value: input.value,
                    name: input.name,
                    onFocus: () => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('account', '');
                        });
                    },
                    onChange: (e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    },
                };
            },
        },
    };

    // Effect
    const TransitionEffect = {
        pulse: {
            animation: 'pulse',
            duration: 500,
        },
    };

    const Field = {
        username: (input) => {
            return {
                ...input,
                id: 'username',
                type: 'text',
                placeholder: 'username',
                className: 'blueIcon',
                size: 'massive',
                icon: 'user circle',
                iconPosition: 'left',
                autoComplete: 'off',
                spellCheck: 'false',
                inverted: true,
                transparent: true,
                fluid: true,
                focus: true,
                onChange: (_, { value }) => {
                    helpers.field.resetError(input, value);
                },
            };
        },
        password: (input) => {
            return {
                ...input,
                id: 'password',
                type: 'password',
                placeholder: 'password',
                className: 'blueIcon',
                size: 'massive',
                icon: 'lock',
                iconPosition: 'left',
                autoComplete: 'off',
                spellCheck: 'false',
                inverted: true,
                transparent: true,
                fluid: true,
                focus: true,
                onChange: (_, { value }) => {
                    helpers.field.resetError(input, value);
                },
            };
        },
        phone: (input, form) => {
            return {
                className: 'blueIcon',
                id: 'phone',
                placeholder: 'xxx-xxxx',
                focus: true,
                type: 'text',
                size: 'massive',
                icon: 'whatsapp',
                fluid: true,
                iconPosition: 'left',
                transparent: true,
                value: input.value,
                name: input.name,
                onFocus: () => {
                    form.change('account', '');
                    form.change('firstName', '');
                    form.change('lastName', '');
                },
                onChange: (e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                },
            };
        },
        account: (input, form) => {
            return {
                className: 'blueIcon',
                id: 'account',
                type: 'text',
                placeholder: 'account #',
                size: 'massive',
                focus: true,
                fluid: true,
                icon: 'credit card',
                iconPosition: 'left',
                transparent: true,
                spellCheck: 'false',
                inverted: true,
                value: input.value,
                name: input.name,
                onFocus: () => {
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('firstName', '');
                        form.change('lastName', '');
                    });
                },
                onChange: (e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                },
            };
        },
        firstName: (input, form) => {
            return {
                placeholder: 'first name',
                className: 'blueIcon',
                icon: 'user circle',
                iconPosition: 'left',
                size: 'massive',
                spellCheck: 'false',
                fluid: true,
                focus: true,
                transparent: true,
                inverted: true,
                value: input.value,
                name: input.name,
                onFocus: () => {
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('account', '');
                    });
                },
                onChange: (e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                },
            };
        },
        lastName: (input, form) => {
            return {
                placeholder: 'last name',
                className: 'blueIcon',
                icon: 'user circle',
                iconPosition: 'left',
                size: 'massive',
                spellCheck: 'false',
                fluid: true,
                focus: true,
                transparent: true,
                inverted: true,
                value: input.value,
                name: input.name,
                onFocus: () => {
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('account', '');
                    });
                },
                onChange: (e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                },
            };
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

    // FORM
    const onSubmit = {
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
        find: async (values, form) => {
            try {
                const data = await send(channels.FIND, values);
                console.log(data);
                if (data.membership) {
                    const { record_id } = await send(channels.LAST_RECORD);
                    console.log({ data, record_id });
                    setTimeout(form.reset, 100);
                    // form.reset({});
                    // history.push({
                    //     pathname: '/purchase',
                    //     state: {
                    //         record: data.membership,
                    //         newRecordID: record_id,
                    //         open: true,
                    //         initialValues: {
                    //             ...data.membership,
                    //             record_id: record_id,
                    //             renew: 0,
                    //             buy: 0,
                    //             fee: 0,
                    //             invoiceDate: new Date().toLocaleDateString(),
                    //             invoiceTime: new Date().toLocaleTimeString(),
                    //         },
                    //     },
                    // });
                } else if (data.memberships) {
                    setTimeout(form.reset, 100);
                    console.log(data.memberships);
                    // history.push({
                    //     pathname: '/accounts',
                    //     state: data.memberships,
                    // });
                } else {
                    setTimeout(form.reset, 100);
                    setError(true);
                    document.getElementById('phone').focus();
                    return data;
                }
            } catch (err) {
                throw err;
            }
        },
    };

    // ONCLICK
    const onClick = {
        login: (setVisible) => {
            setVisible((visible) => !visible);
        },
        admin: (setVisible) => {
            setVisible((prev) => !prev);
            open.admin();
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
        find: (setVisible) => {
            setVisible((prev) => !prev);
        },
        add: (setVisible) => {
            setVisible((prev) => !prev);
            open.add();
        },
        report: (setVisible) => {
            setVisible((prev) => !prev);
            open.report();
        },
        logout: (setVisible) => {
            setVisible((prev) => !prev);
            close.dashboard();
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
        add: async () => {
            await helpers.sleep(500);
            history.push({ pathname: '/add', state: {} });
        },
        report: async () => {
            await helpers.sleep(500);
            history.push({
                pathname: '/report',
                state: {},
            });
        },
    };

    const close = {
        dashboard: async () => {
            await helpers.sleep(500);
            history.push({ pathname: '/', state: {} });
        },
    };

    // FIELD HELPERS
    const resetError = (input, value) => {
        setError(false);
        return input.onChange(value);
    };

    const store = {
        onSubmit,
        onClick,
        open,
        error,
        component: {
            login: LoginComponent,
            dashboard: DashboardComponent,
            admin: AdminComponent,
        },
        field: {
            ...Field,
            // ...LoginComponent.field,
            // ...DashboardComponent.field,
        },
        button: {
            ...LoginComponent.button,
            ...DashboardComponent.button,
        },
        effect: {
            pulse: TransitionEffect.pulse,
        },
        screen: {
            dashboard: DashboardComponent.screen,
            login: DashboardComponent.screen,
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
