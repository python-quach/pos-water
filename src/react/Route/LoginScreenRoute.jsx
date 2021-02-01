import { Route } from 'react-router-dom';
import LoginScreen from '../Login/LoginScreen';

const LoginScreenRoute = ({ channels, ipcRenderer, exact, path }) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => (
                <LoginScreen
                    {...routeProps}
                    channels={channels}
                    ipcRenderer={ipcRenderer}
                />
            )}
        />
    );
};

export default LoginScreenRoute;
