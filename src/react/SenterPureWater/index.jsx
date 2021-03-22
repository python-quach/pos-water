import { useState, useEffect } from 'react';
import Login from './Screen/LoginScreen';
import DashBoard from './Screen/DashBoardScreen';
import Account from './Screen/AccountScreen';
import Add from './Screen/AddScreen';
import Buy from './Screen/BuyScreen';
import {
    login,
    backup,
    renew,
    buy,
    add,
    edit,
    closeApp,
    deleteMembership,
} from './Api';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const SenterPureWater = (props) => {
    const [openLogin, setOpenLogin] = useState(true);
    const [openDashBoard, setOpenDashBoard] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [record, setRecord] = useState(false);
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(false);
    const [history, setHistory] = useState(null);
    const [fileSave, setFileSave] = useState(null);
    const [adminPassword, setAdminPassword] = useState('');
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFindMembership = async (values) => {
        if (values.phone) {
            ipcRenderer.send(channels.SENTER_FIND_PHONE, values.phone);
            ipcRenderer.on(channels.SENTER_FIND_PHONE, (_, data) => {
                console.log('RESPONSE FROM FIND PHONE', data);
                if (data.account) {
                    ipcRenderer.send(
                        channels.SENTER_ACCOUNT_HISTORY,
                        data.account.account
                    );
                    ipcRenderer.on(
                        channels.SENTER_ACCOUNT_HISTORY,
                        (event, args) => {
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_ACCOUNT_HISTORY
                            );
                            console.log('History', args);
                            setHistory(args);
                            setRecord(data.account);
                            setOpenBuy(true);
                            setOpenDashBoard(false);
                            // Remove Find Listener
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_FIND_PHONE
                            );
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                    // Remove Find Listener
                    ipcRenderer.removeAllListeners(channels.SENTER_FIND_PHONE);
                } else {
                    console.log(
                        'There are not account with the phone number',
                        values.phone
                    );
                    ipcRenderer.removeAllListeners(channels.SENTER_FIND_PHONE);
                }
            });
        } else if (values.account) {
            ipcRenderer.send(channels.SENTER_FIND_ACCOUNT, values.account);
            ipcRenderer.on(
                channels.SENTER_FIND_ACCOUNT,
                (_, lastAccountRecord) => {
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_ACCOUNT
                    );
                    console.log(
                        'RESPONSE FROM FIND ACCOUNT',
                        lastAccountRecord
                    );

                    if (!lastAccountRecord) {
                        console.log(
                            'Unable to find Account',
                            lastAccountRecord
                        );
                    } else {
                        ipcRenderer.send(
                            channels.SENTER_ACCOUNT_HISTORY,
                            values.account
                        );
                        ipcRenderer.on(
                            channels.SENTER_ACCOUNT_HISTORY,
                            (event, args) => {
                                ipcRenderer.removeAllListeners(
                                    channels.SENTER_ACCOUNT_HISTORY
                                );
                                console.log('History', args);
                                setHistory(args);
                                setRecord(lastAccountRecord);
                                setOpenBuy(true);
                                setOpenDashBoard(false);
                            }
                        );
                    }
                }
            );
        } else if (values.first) {
            ipcRenderer.send(channels.SENTER_FIND_FIRST_NAME, values.first);
            ipcRenderer.on(channels.SENTER_FIND_FIRST_NAME, (_, data) => {
                console.log('RESPONSE FROM FIND FIRST NAME', data);

                if (data.account && data.account.account) {
                    ipcRenderer.send(
                        channels.SENTER_ACCOUNT_HISTORY,
                        data.account.account
                    );
                    ipcRenderer.on(
                        channels.SENTER_ACCOUNT_HISTORY,
                        (event, args) => {
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_ACCOUNT_HISTORY
                            );
                            console.log('History', args);
                            setHistory(args);
                            setRecord(data.account);
                            setOpenBuy(true);
                            setOpenDashBoard(false);
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_FIND_FIRST_NAME
                            );
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_FIRST_NAME
                    );
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
                    );
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_FIRST_NAME
                    );
                }
            });
        } else if (values.last) {
            ipcRenderer.send(channels.SENTER_FIND_LAST_NAME, values.last);
            ipcRenderer.on(channels.SENTER_FIND_LAST_NAME, (_, data) => {
                console.log('RESPONSE FROM FIND LAST NAME', data);

                if (data.account && data.account.account) {
                    ipcRenderer.send(
                        channels.SENTER_ACCOUNT_HISTORY,
                        data.account.account
                    );
                    ipcRenderer.on(
                        channels.SENTER_ACCOUNT_HISTORY,
                        (event, args) => {
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_ACCOUNT_HISTORY
                            );
                            console.log('History', args);
                            setHistory(args);
                            setRecord(data.account);
                            setOpenBuy(true);
                            setOpenDashBoard(false);
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_FIND_LAST_NAME
                            );
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_LAST_NAME
                    );
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
                    );
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_LAST_NAME
                    );
                }
            });
        } else if (values.first && values.last) {
            ipcRenderer.send(channels.SENTER_FIND_BOTH_NAME, {
                first: values.first,
                last: values.last,
            });
            ipcRenderer.on(channels.SENTER_FIND_BOTH_NAME, (_, data) => {
                console.log('RESPONSE FROM FIND BOTH NAME', data);

                if (data.account && data.account.account) {
                    ipcRenderer.send(
                        channels.SENTER_ACCOUNT_HISTORY,
                        data.account.account
                    );
                    ipcRenderer.on(
                        channels.SENTER_ACCOUNT_HISTORY,
                        (event, args) => {
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_ACCOUNT_HISTORY
                            );
                            console.log('History', args);
                            setHistory(args);
                            setRecord(data.account);
                            setOpenBuy(true);
                            setOpenDashBoard(false);
                            ipcRenderer.removeAllListeners(
                                channels.SENTER_FIND_BOTH_NAME
                            );
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_BOTH_NAME
                    );
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
                    );
                    ipcRenderer.removeAllListeners(
                        channels.SENTER_FIND_BOTH_NAME
                    );
                }
            });
        }
    };

    const launchBuyScreen = ({ record, history, openBuy, openAdd }) => {
        setError(false);
        setRecord(record);
        setHistory(history);
        setOpenBuy(openBuy);
        setOpenAdd(openAdd);
        document.getElementById('buy').focus();
    };

    const updateBuyScreen = ({ history, record }) => {
        setHistory(history);
        setRecord(record);
        document.getElementById('buy').focus();
        return record;
    };

    const launchDashBoardScreen = (login) => {
        console.log('User Login Successfully:', { login });
        setError(false);
        setOpenLogin(false);
        setOpenDashBoard(true);
        document.getElementById('phone').focus();
    };

    const showLoginButtonError = (login) => {
        console.log('Invalid Credential:', { login });
        setError(true);
        document.getElementById('username').focus();
    };

    // FORM: ADD SCREEN
    const handleAddMembership = async (values) => {
        try {
            launchBuyScreen(await add(values));
        } catch (err) {
            setError(err);
            document.getElementById('account').focus();
        }
    };

    // FORM: LOGIN SCREEN, form onSubmit handler
    const handleUserLogin = async (values) => {
        try {
            launchDashBoardScreen(await login(values));
        } catch (err) {
            showLoginButtonError(err);
        }
    };

    // FORM:  BACKUP database
    const handleBackup = async () => {
        setLoading(true);
        try {
            const result = await backup();
            console.log('Backup result', result);
            if (result.open) {
                setFileSave(result.open);
                setLoading(false);
            }
            // throw new Error('Unable to back file');
        } catch (err) {
            setLoading(false);
            return err;
        }
    };

    // FORM: BUY AND RENEW GALLON
    const handleBuy = async (values) => {
        if (values.gallon !== 0 && values.fee !== 0) {
            try {
                return updateBuyScreen(await renew(values));
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                return updateBuyScreen(await buy(values));
            } catch (err) {
                console.log(err);
            }
        }
    };

    // HANDLE EDIT BUY FORM:
    const handleEdit = async (values) => {
        try {
            const data = await edit(values);
            console.log('handleEdit Look Here', data);
            setRecord(data[data.length - 1]);
            setHistory(data);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    // HANDLE DELETE MEMBERSHIP
    const handleDeleteMembership = async (values) => {
        const { account, password } = values;
        try {
            const { auth, status } = await deleteMembership({
                account,
                password,
            });

            console.log(auth, status);
            if (auth) {
                setRecords((prevRecords) =>
                    prevRecords.filter((record) => record.account !== account)
                );
                setOpenDelete(false);
                setAdminPassword('');
                if (openBuy) {
                    setOpenBuy(false);
                }
                // setOpenBuy(false);
            }
        } catch (err) {
            setOpenDelete(true);
            setAdminPassword('');
            console.log('Warning unable to delete Account');
        }
    };

    useEffect(() => {
        console.log('admin', adminPassword);
    }, [adminPassword]);

    useEffect(() => {
        if (records && records.length === 0) {
            setOpenAccount(false);
            setOpenDashBoard(true);
        }
    }, [records]);

    return (
        // <Segment raised style={{ height: '100vh', overflow: 'scroll' }}>
        <>
            {openLogin && (
                <Login
                    open={openLogin}
                    error={error}
                    fileSave={fileSave}
                    openAdmin={openAdmin}
                    setOpenAdmin={setOpenAdmin}
                    onSubmit={handleUserLogin}
                    backup={handleBackup}
                    setError={setError}
                    closeApp={closeApp}
                    setFileSave={setFileSave}
                    loading={loading}
                />
            )}
            {openDashBoard && (
                <DashBoard
                    open={openDashBoard}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenLogin={setOpenLogin}
                    setOpenAdd={setOpenAdd}
                    handleFindMembership={handleFindMembership}
                />
            )}
            {openAdd && (
                <Add
                    open={openAdd}
                    error={error}
                    setError={setError}
                    handleAddMembership={handleAddMembership}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenBuy={setOpenBuy}
                    setRecord={setRecord}
                    setOpenAdd={setOpenAdd}
                />
            )}
            {openBuy && (
                <Buy
                    open={openBuy}
                    handleEdit={handleEdit}
                    records={history}
                    handleBuy={handleBuy}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenBuyScreen={setOpenBuy}
                    setRecord={setRecord}
                    record={record}
                    openDelete={openDelete}
                    deleteAccount={deleteAccount}
                    setDeleteAccount={setDeleteAccount}
                    setOpenDelete={setOpenDelete}
                    setOpenDeleteConfirm={setOpenDeleteConfirm}
                    openDeleteConfirm={openDeleteConfirm}
                    setAdminPassword={setAdminPassword}
                    adminPassword={adminPassword}
                    handleDeleteMembership={handleDeleteMembership}
                />
            )}
            {openAccount && (
                <Account
                    open={openAccount}
                    records={records}
                    openAccount={openAccount}
                    openDelete={openDelete}
                    deleteAccount={deleteAccount}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenAccountScreen={setOpenAccount}
                    find={handleFindMembership}
                    setOpenDelete={setOpenDelete}
                    setRecords={setRecords}
                    setDeleteAccount={setDeleteAccount}
                    handleDeleteMembership={handleDeleteMembership}
                    setOpenDeleteConfirm={setOpenDeleteConfirm}
                    openDeleteConfirm={openDeleteConfirm}
                    setAdminPassword={setAdminPassword}
                    adminPassword={adminPassword}
                />
            )}
        </>
        // </Segment>
    );
};

export default SenterPureWater;
