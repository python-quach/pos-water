import { useState } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Login from './Screen/LoginScreen';
import DashBoard from './Screen/DashBoardScreen';
import Account from './Screen/AccountScreen';
import Add from './Screen/AddScreen';
import Buy from './Screen/BuyScreen';
import Admin from './Screen/AdminScreen';
import History from './History/CustomerHistory';
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
    const [error, setError] = useState('');

    const handleAddMembership = async (values) => {
        const data = {
            ...values,
            fee: parseInt(values.fee),
            gallon: parseInt(values.gallon),
            remain: parseInt(values.gallon),
            previous: parseInt(values.gallon),
        };

        ipcRenderer.send(channels.SENTER_ADD, data);
        ipcRenderer.on(channels.SENTER_ADD, (_, args) => {
            ipcRenderer.removeAllListeners(channels.SENTER_ADD);
            if (args.error) {
                setError(args.error);
                document.getElementById('account').focus();
            } else {
                // setRecord(args);
                setRecord({ ...args, gallon: 0 });
                setOpenBuy(true);
                setOpenAdd(false);
            }
        });
    };

    const handleBuy = async (values) => {
        // console.log('Buy Submit', values);

        if (values.gallon !== 0 && values.fee !== 0) {
            const renew = {
                ...values,
                type: 'RENEW',
            };
            console.log('RENEW:', renew);
            return new Promise((resolve, reject) => {
                ipcRenderer.send(channels.SENTER_BUY, renew);
                ipcRenderer.on(channels.SENTER_BUY, (_, args) => {
                    ipcRenderer.removeAllListeners(channels.SENTER_BUY);
                    setRecord({ ...args, remain: args.remain + args.gallon });
                    document.getElementById('buy').focus();
                    resolve(args);
                });
            });
        } else {
            const buy = {
                ...values,
                type: 'BUY',
            };
            console.log('BUY:', buy);
            return new Promise((resolve, reject) => {
                ipcRenderer.send(channels.SENTER_BUY, buy);
                ipcRenderer.on(channels.SENTER_BUY, (_, args) => {
                    ipcRenderer.removeAllListeners(channels.SENTER_BUY);
                    setRecord(args);
                    resolve(args);
                });
            });
        }

        // return new Promise((resolve, reject) => {
        //     ipcRenderer.send(channels.SENTER_BUY, values);
        //     ipcRenderer.on(channels.SENTER_BUY, (_, args) => {
        //         ipcRenderer.removeAllListeners(channels.SENTER_BUY);
        //         setRecord(args);
        //         resolve(args);
        //     });
        // });
    };

    return (
        // <Segment raised style={{ height: '100vh', overflow: 'scroll' }}>
        <>
            {/* <Add setOpenBuy={setOpenBuy} setRecord={setRecord} /> */}
            {/* {openBuy && <Buy setOpenBuyScreen={setOpenBuy} record={record} />} */}
            {/* <Header size='huge'>MckeePureWater</Header> */}
            {openLogin && (
                <Login
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenLogin={setOpenLogin}
                />
            )}
            {openDashBoard && (
                <DashBoard
                    open={openDashBoard}
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenLogin={setOpenLogin}
                    setOpenAdd={setOpenAdd}
                />
            )}
            {openAdd && (
                <Add
                    open={openAdd}
                    error={error}
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
                    handleBuy={handleBuy}
                    setOpenBuyScreen={setOpenBuy}
                    setRecord={setRecord}
                    record={record}
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
