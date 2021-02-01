import { Route } from 'react-router-dom';
import AccountScreen from '../Account/AccountScreen';

const AccountRoute = ({ channels, ipcRenderer, exact, path }) => (
    <Route
        exact={exact}
        path={path}
        render={(routeProps) => (
            <AccountScreen
                {...routeProps}
                channels={channels}
                ipcRenderer={ipcRenderer}
            />
        )}
    />
);
export default AccountRoute;
