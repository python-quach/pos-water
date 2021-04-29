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

    // User Table Admin
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);

    const [edit, setEdit] = useState(false);

    // CRUD
    const crud = {
        create: async ({ newItem, setState, channel }) => {
            try {
                const result = await send(channel, newItem);
                setState((list) => [...list, result]);
            } catch (err) {
                throw err;
            }
        },
        read: async (setState) => {
            try {
                const data = await send(channels.GET_USERS);
                console.log('Response From Server', { data });
                setState(data);
            } catch (err) {
                setState([]);
                return console.log('Unable to get user');
            }
        },
        update: async ({ updatedItem, setState, channel }) => {
            try {
                await send(channel, updatedItem);
                setState((list) => {
                    return list.map((item) =>
                        item.user_id === updatedItem.user_id
                            ? updatedItem
                            : item
                    );
                });
            } catch (err) {
                setUser({});
                throw err;
            }
        },
        delete: ({ deletedId, setState }) => {
            console.log({ deletedId, setState });
            setState((list) =>
                list.filter((item) => item.user_id !== deletedId)
            );
        },
    };

    // Effect
    const TransitionEffect = {
        pulse: {
            animation: 'pulse',
            duration: 500,
        },
    };

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
        reset: {
            field: (change, value) => {
                setError(false);
                change(value);
            },
        },
    };

    // LOGIN SCREEN COMPONENT
    const LoginComponent = {
        screen: {
            open: history ? true : false,
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
        header: {
            title: 'Mckee Pure Water',
            content: 'User Login Version 1.0.0',
        },
        input: {
            username: {
                attr: {
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
                },
                onFocus: () => {},
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
            password: {
                attr: {
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
                },
                onFocus: () => {},
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
        },
        button: {
            login: {
                attr: {
                    type: 'submit',
                    content: !error ? 'Login' : error,
                    color: !error ? 'blue' : 'red',
                    size: 'huge',
                    icon: 'sign-in',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: () => {},
            },
            admin: {
                attr: {
                    content: 'Admin',
                    type: 'button',
                    color: 'yellow',
                    size: 'huge',
                    icon: 'database',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: async () => {
                    setError(false);
                    await helpers.sleep(500);
                    history.push({
                        pathname: '/admin/login',
                        state: { open: true },
                    });
                },
            },
            close: {
                attr: {
                    content: 'Close',
                    type: 'button',
                    color: 'black',
                    size: 'huge',
                    icon: 'close',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: async () => {
                    await helpers.sleep(500);
                    await send(channels.CLOSE_APP);
                },
            },
            backup: {
                attr: {
                    disabled: loading,
                    content: fileSave,
                    loading: loading,
                    type: 'button',
                    size: 'huge',
                    icon: 'save',
                    circular: true,
                    color: 'pink',
                    fluid: true,
                },
                onClick: async () => {
                    await helpers.sleep(500);
                    setLoading(true);
                    try {
                        const response = await send(
                            channels.SHOW_BACKUP_DIALOG
                        );
                        setFileSave(response);
                    } catch (err) {
                        setFileSave(err);
                    }
                    setLoading(false);
                },
            },
        },
        onSubmit: async (values, form) => {
            try {
                const result = await send(channels.LOGIN, values);
                console.log(result);
                history.push({
                    pathname: '/dashboard',
                    state: result,
                });
            } catch (err) {
                setTimeout(() => {
                    console.log(err);
                    setError(err);
                    form.reset({});
                    document.getElementById('username').focus();
                }, 100);
            }
        },
    };

    const PurchaseComponent = {
        screen: {
            open: history ? true : false,
            width: {},
            close: {
                closeOnDocumentClick: false,
                closeOnEscape: false,
                closeOnDimmerClick: false,
                closeOnPortalMouseLeave: false,
            },
            segment: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: 1000,
                backgroundColor: '#002b487d',
            },
            grid: {
                style: { height: '100vh' },
            },
        },
        header: {
            title: 'Mckee Pure Water',
            content: 'Purchase Screen Version 1.0.1',
        },
        input: {
            account: {
                attr: {},
            },
            since: {
                attr: {},
            },
            areaCode: {
                attr: {},
            },
            phone: {
                attr: {},
            },
            fullname: {
                attr: {},
            },
            first: {
                attr: {},
            },
            last: {
                attr: {},
            },
        },
        button: {
            edit: {
                attr: {
                    style: { marginTop: '30px' },
                },
                onClick: () => {},
            },
            cancel: {
                attr: {
                    style: { marginTop: '30px' },
                },
                onClick: () => {},
            },
            save: {
                attr: {
                    style: { marginTop: '30px' },
                },
                onClick: () => {},
            },
            buy: {
                attr: {
                    style: { marginTop: '30px', width: '160px' },
                },
                onClick: () => {},
            },
            renew: {
                attr: {
                    style: { marginTop: '30px', width: '160px' },
                },
                onClick: () => {},
            },
            done: {
                attr: {},
                onClick: () => {},
            },
            history: {
                attr: {},
                onClick: () => {},
            },
        },
        onSubmit: async (values) => {
            console.log('PurchaseComponent: onSubmit:', values);
        },
        edit,
    };

    // DASHBOARD SCREEN COMPONENT
    const DashboardComponent = {
        screen: {
            open: history ? true : false,
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
        header: {
            title: 'Mckee Pure Water',
            content: 'Dashboard',
        },
        input: {
            phone: {
                attr: {
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
                },
                normalize: helpers.normalize.phone,
                onFocus: (form) =>
                    form.batch(() => {
                        form.change('account', '');
                        form.change('firstName', '');
                        form.change('lastName', '');
                    }),
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
            account: {
                attr: {
                    id: 'account',
                    className: 'blueIcon',
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
                },
                normalize: helpers.normalize.account,
                onFocus: (form) =>
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('firstName', '');
                        form.change('lastName', '');
                    }),
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
            firstName: {
                attr: {
                    id: 'firstName',
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
                },
                onFocus: (form) =>
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('account', '');
                    }),
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
            lastName: {
                attr: {
                    id: 'lastName',
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
                },
                onFocus: (form) =>
                    form.batch(() => {
                        form.change('phone', '');
                        form.change('account', '');
                    }),
                onChange: (change, value) => {
                    setError(false);
                    change(value);
                },
            },
        },
        button: {
            find: {
                attr: {
                    id: 'FindMembership',
                    content: 'Find Membership',
                    color: 'blue',
                    type: 'submit',
                    size: 'huge',
                    icon: 'search',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: () => {},
            },
            add: {
                attr: {
                    id: 'AddButton',
                    content: 'New Membership',
                    type: 'button',
                    size: 'huge',
                    color: 'teal',
                    icon: 'add circle',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: async () => {
                    await helpers.sleep(500);
                    history.push({ pathname: '/add', state: {} });
                },
            },
            report: {
                attr: {
                    id: 'ReportButton',
                    content: `Daily Report: ${new Date().toLocaleDateString()}`,
                    type: 'button',
                    color: 'yellow',
                    size: 'huge',
                    icon: 'calendar',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: async () => {
                    await helpers.sleep(500);
                    history.push({
                        pathname: '/report',
                        state: {},
                    });
                },
            },
            logout: {
                attr: {
                    content: 'Logout',
                    type: 'button',
                    id: 'LogoutButton',
                    size: 'huge',
                    color: 'black',
                    icon: 'sign-out',
                    labelPosition: 'right',
                    circular: true,
                    fluid: true,
                },
                onClick: async () => {
                    await helpers.sleep(500);
                    history.push({ pathname: '/', state: {} });
                },
            },
        },
        onSubmit: async (values, form) => {
            try {
                const data = await send(channels.FIND, values);
                console.log(data);
                if (data.membership) {
                    const { record_id } = await send(channels.LAST_RECORD);
                    console.log({ data, record_id });
                    setTimeout(form.reset, 100);
                    form.reset({});
                    history.push({
                        pathname: '/purchase',
                        state: {
                            record: data.membership,
                            newRecordID: record_id,
                            open: true,
                            initialValues: {
                                ...data.membership,
                                record_id: record_id,
                                renew: 0,
                                buy: 0,
                                fee: 0,
                                invoiceDate: new Date().toLocaleDateString(),
                                invoiceTime: new Date().toLocaleTimeString(),
                            },
                        },
                    });
                } else if (data.memberships) {
                    setTimeout(form.reset, 100);
                    console.log(data.memberships);
                    history.push({
                        pathname: '/accounts',
                        state: data.memberships,
                    });
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

    // ADMIN SCREEN COMPONENT
    const AdminLoginComponent = {
        screen: {
            open: history ? true : false,
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
        header: {
            title: 'Mckee Pure Water',
            content: 'Admin Login Verification',
        },
        input: {
            password: {
                attr: {
                    id: 'password',
                    placeholder: 'password',
                    type: 'password',
                    focus: true,
                    error: error,
                    size: 'huge',
                },
                onFocus: () => {},
                onChange: helpers.reset.field,
            },
        },
        button: {
            submit: {
                attr: {
                    id: 'submit',
                    content: 'Submit',
                    circular: true,
                    size: 'huge',
                    type: 'submit',
                    color: error ? 'red' : 'blue',
                },
                onClick: () => {},
            },
            cancel: {
                attr: {
                    id: 'cancel',
                    content: 'Cancel',
                    circular: true,
                    size: 'huge',
                    type: 'button',
                    secondary: true,
                },
                onClick: () => {
                    setError(false);
                    history.push('/');
                },
            },
        },
        onSubmit: async ({ password }, form) => {
            console.log('onSubmit', { password });
            if (password === '911') {
                await helpers.sleep(500);
                history.push({
                    pathname: '/admin/users',
                    state: { open: true },
                });
            } else {
                setError(true);
                setTimeout(form.reset);
            }
        },
    };

    // USER SCREEN COMPONENT
    const UserComponent = {
        screen: {
            open: history ? true : false,
            close: {
                closeOnDocumentClick: false,
                closeOnEscape: false,
                closeOnDimmerClick: false,
                closeOnPortalMouseLeave: false,
            },
            segment: {
                style: {
                    margin: 0,
                    height: '100vh',
                    overflow: 'scroll',
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
            width: {
                style: {
                    maxWidth: 800,
                },
            },
        },
        header: {
            title: 'Mckee Pure Water',
            content: 'User Admin Screen',
        },
        form: {
            onSubmit: async (values) => {
                console.log('onSubmit', { values });
                crud.create({ newItem: values, setState: setUsers });
            },
        },
        button: {
            add: {
                attr: {
                    id: 'add',
                    content: 'Add',
                    type: 'button',
                    floated: 'right',
                    circular: true,
                    primary: true,
                    size: 'huge',
                    fluid: true,
                },
                onClick: () => setOpen(true),
            },
            done: {
                attr: {
                    id: 'done',
                    content: 'Done',
                    type: 'button',
                    circular: true,
                    size: 'huge',
                    secondary: true,
                },
                onClick: () => {
                    history.push('/');
                },
            },
            delete: {
                attr: {
                    id: 'delete',
                    content: 'Delete',
                    circular: true,
                    size: 'huge',
                    negative: true,
                },
                onClick: (user_id) => {
                    console.log('delete', { user_id });
                    crud.delete({ deletedId: user_id, setState: setUsers });
                },
            },
            edit: {
                attr: {
                    id: 'edit',
                    type: 'button',
                    content: 'Edit',
                    size: 'huge',
                    fluid: true,
                    floated: 'right',
                    circular: true,
                    primary: true,
                },
                onClick: (user) => {
                    console.log('Edit', { user });
                    setUser(user);
                    setOpen(true);
                },
            },
        },
        table: {
            attr: {
                id: 'UserTable',
                celled: true,
                compact: true,
                definition: true,
                basic: true,
                inverted: true,
                size: 'large',
            },
            header: {
                fullWidth: true,
            },
            row: {
                header: {
                    style: { fontSize: '22px' },
                },
                body: {
                    style: { fontSize: '20px', fontWeight: 'bold' },
                },
            },
            cell: {
                headerCells: [
                    { content: 'username' },
                    { content: 'password' },
                    { content: 'Action', width: 5, textAlign: 'right' },
                ],
                header: {
                    username: {
                        content: 'username',
                    },
                    password: {
                        content: 'password',
                    },
                    action: {
                        content: 'Action',
                        width: 5,
                        textAlign: 'right',
                    },
                },
            },
        },
        action: {
            fetchData: async () => {
                const users = await send(channels.GET_USERS);
                setUsers(users);
            },
        },
        users,
        setUsers,
    };

    // USER UPDATE COMPONENT
    const UserModalComponent = {
        modal: {
            open: open,
            dimmer: 'blurring',
            size: 'fullscreen',
            basic: true,
            centered: true,
        },
        form: {
            size: 'massive',
        },
        input: {
            username: {
                attr: {
                    id: 'username',
                    placeholder: 'username',
                },
                onFocus: () => {},
                onChange: () => {},
            },
            password: {
                attr: {
                    id: 'password',
                    placeholder: 'password',
                },
                onFocus: () => {},
                onChange: () => {},
            },
        },
        button: {
            submit: {
                attr: {
                    id: 'submit',
                    type: 'submit',
                    content: !user.user_id ? 'Add' : 'Save',
                    size: 'massive',
                    circular: true,
                    primary: true,
                },
                onClick: () => {},
            },
            cancel: {
                attr: {
                    id: 'cancel',
                    type: 'button',
                    content: 'Cancel',
                    size: 'massive',
                    circular: true,
                    secondary: true,
                },
                onClick: () => {
                    setUser({});
                    setOpen(false);
                },
            },
        },
        onSubmit: async (values) => {
            try {
                user.user_id
                    ? await crud.update({
                          updatedItem: {
                              ...user,
                              username: values.username,
                              password: values.password,
                          },
                          setState: setUsers,
                          channel: channels.EDIT_USER,
                      })
                    : await crud.create({
                          newItem: values,
                          setState: setUsers,
                          channel: channels.ADD_USER,
                      });
                setOpen(false);
                setUser({});
            } catch (err) {
                return console.log(err.message);
            }
        },
        user,
    };

    // STORE
    const store = {
        component: {
            login: LoginComponent,
            dashboard: DashboardComponent,
            admin: AdminLoginComponent,
            user: UserComponent,
            userModal: UserModalComponent,
        },
        effect: {
            pulse: TransitionEffect.pulse,
        },
    };

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export default withRouter(Store);
