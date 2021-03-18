import { useState, useEffect } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Login from './Screen/LoginScreen';
import DashBoard from './Screen/DashBoardScreen';
import Account from './Screen/AccountScreen';
import Add from './Screen/AddScreen';
import Buy from './Screen/BuyScreen';
import Admin from './Screen/AdminScreen';
import History from './History/CustomerHistory';
import { login, backup, renew, buy, add, findPhone, edit } from './Api';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const MckeePureWater = (props) => {
    const [openLogin, setOpenLogin] = useState(true);
    const [openDashBoard, setOpenDashBoard] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [record, setRecord] = useState(false);
    const [records, setRecords] = useState([]);
    // const [error, setError] = useState('');
    const [error, setError] = useState(false);
    const [history, setHistory] = useState(null);
    const [fileSave, setFileSave] = useState(null);
    // const [backup, setBackup] = useState(null)

    // const showBuyScreen = ({ history, record }) => {
    //     setError(false);
    //     setHistory(history);
    //     setRecord(record);
    //     setOpenBuy(true);
    //     setOpenDashBoard(false);
    //     // document.getElementById('buy').focus();
    // };

    const handleFindMembership = async (values) => {
        console.log(values);

        if (values.phone) {
            ipcRenderer.send(channels.SENTER_FIND_PHONE, values.phone);
            ipcRenderer.on(channels.SENTER_FIND_PHONE, (_, data) => {
                console.log('RESPONSE FROM FIND PHONE', data);
                // We need to check for multiple account with same phone number
                if (data.account) {
                    ipcRenderer.send(
                        channels.SENTER_ACCOUNT_HISTORY,
                        data.account.account
                        // values.data.account
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
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                } else {
                    console.log(
                        'There are not account with the phone number',
                        values.phone
                    );
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

                        // setRecord(lastAccountRecord);
                        // setOpenDashBoard(false);
                        // setOpenBuy(true);
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
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
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
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
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
                        }
                    );
                } else if (data.accounts) {
                    console.log('found many account ', data.accounts);
                    setRecords(data.accounts);
                    setOpenAccount(true);
                    setOpenDashBoard(false);
                } else {
                    console.log(
                        'There are not account with the name',
                        values.first
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
        try {
            const result = await backup();
            console.log('Backup result', result);
            setFileSave(result);
        } catch (err) {
            setFileSave(err);
            console.log(err);
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

    const handleEdit = async (values) => {
        try {
            const data = await edit(values);
            console.log('handleEdit Look Here', data);
            setRecord(data[data.length - 1]);
            setHistory(data);
            return data;
            // return await edit(values);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // <Segment raised style={{ height: '100vh', overflow: 'scroll' }}>
        <>
            {openLogin && (
                <Login
                    open={openLogin}
                    error={error}
                    fileSave={fileSave}
                    onSubmit={handleUserLogin}
                    backup={handleBackup}
                    setError={setError}
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
                />
            )}
            {openAccount && (
                <Account
                    open={openAccount}
                    records={records}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenAccountScreen={setOpenAccount}
                    openAccount={openAccount}
                    find={handleFindMembership}
                />
            )}

            {/* {openBuy && (
                <Buy setOpenBuyScreen={setOpenBuy} setRecord={setRecord} />
            )} */}

            {/* {openAccount && <Account setOpenAccountScreen={setOpenAccount} />}
            {openAdd && <Add setOpenAddScreen={setOpenAdd} />}
            {openBuy && <Buy setOpenBuyScreen={setOpenBuy} />}
            {openAdmin && <Admin setOpenAdmin={setOpenAdmin} />}
            {openHistory && <History setOpenHistory={setOpenHistory} />} */}
        </>
        // </Segment>
    );
};

export default MckeePureWater;
