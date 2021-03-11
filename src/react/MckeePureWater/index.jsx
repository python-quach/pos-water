import { Segment, Header } from 'semantic-ui-react';
import LoginScreen from './Screen/LoginScreen';
import DashBoardScreen from './Screen/DashBoardScreen';
import AccountScreen from './Screen/AccountScreen';
import AddScreen from './Screen/AddScreen';
import BuyScreen from './Screen/BuyScreen';
import AdminScreen from './Screen/AdminScreen';
import CustomerHistory from './History/CustomerHistory';

const MckeePureWater = (props) => {
    return (
        <Segment raised style={{ height: '100vh', overflow: 'scroll' }}>
            <Header size='huge'>MckeePureWater</Header>
            <LoginScreen />
            <DashBoardScreen />
            <AccountScreen />
            <AddScreen />
            <BuyScreen />
            <AdminScreen />
            <CustomerHistory />
        </Segment>
    );
};

export default MckeePureWater;
