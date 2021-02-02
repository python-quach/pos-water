import { Route } from 'react-router-dom';
import LoginScreen from '../Login/LoginScreen';

const LoginScreenRoute = ({ exact, path, api }) => {
    return (
        <Route
            exact={exact}
            path={path}
            render={(routeProps) => <LoginScreen {...routeProps} api={api} />}
        />
    );
};

export default LoginScreenRoute;
