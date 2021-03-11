import { useState } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Login from './Screen/LoginScreen';
import DashBoard from './Screen/DashBoardScreen';
import Account from './Screen/AccountScreen';
import Add from './Screen/AddScreen';
import Buy from './Screen/BuyScreen';
import Admin from './Screen/AdminScreen';
import History from './History/CustomerHistory';

const MckeePureWater = (props) => {
    const [openLogin, setOpenLogin] = useState(true);
    const [openDashBoard, setOpenDashBoard] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);

    return (
        // <Segment raised style={{ height: '100vh', overflow: 'scroll' }}>
        <>
            {/* <Header size='huge'>MckeePureWater</Header> */}
            {openLogin && (
                <Login
                    setOpenDashBoard={setOpenDashBoard}
                    setOpenLogin={setOpenLogin}
                />
            )}
            {openDashBoard && (
                <DashBoard
                    setOpenLogin={setOpenLogin}
                    setOpenDashBoard={setOpenDashBoard}
                />
            )}
            {openAccount && <Account setOpenAccountScreen={setOpenAccount} />}
            {openAdd && <Add setOpenAddScreen={setOpenAdd} />}
            {openBuy && <Buy setOpenBuyScreen={setOpenBuy} />}
            {openAdmin && <Admin setOpenAdmin={setOpenAdmin} />}
            {openHistory && <History setOpenHistory={setOpenHistory} />}
        </>
        // </Segment>
    );
};

export default MckeePureWater;
