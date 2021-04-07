import LoginScreen from './Login/LoginScreen';
import BuyScreen from './Buy/Screen/BuyScreen';
import AdminScreen from './Admin/AdminScreen';
import AddScreen from './Add/Screen/AddScreen';
import DashboardScreen from './Dashboard/Screen/DashboardScreen';
import AdminTableScreen from './Admin/AdminTableScreen';

export const Screen = {
    Login: LoginScreen,
    Dashboard: DashboardScreen,
    Admin: AdminScreen,
    Table: AdminTableScreen,
    Add: AddScreen,
    Buy: BuyScreen,
};

export default Screen;
