import { Route } from 'react-router-dom';
import LoginScreen from '../Login/LoginScreen';

const LoginScreenRoute = (props) => {
    console.log(props);
    const { channels, ipcRenderer, exact, path } = props;
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
