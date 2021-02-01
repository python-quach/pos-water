import { Route } from 'react-router-dom';
import DashBoardScreen from '../Dashboard/Dashboard';

const DashBoardRoute = ({ channels, ipcRenderer, exact, path }) => (
    <Route
        exact={exact}
        path={path}
        render={(routeProps) => (
            <DashBoardScreen
                {...routeProps}
                channels={channels}
                ipcRenderer={ipcRenderer}
            />
        )}
    />
);
export default DashBoardRoute;
