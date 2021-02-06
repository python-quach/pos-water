import { Route } from 'react-router-dom';

export const Login = ({ children, path, api }) => {
    return (
        <Route exact path={path}>
            {children(api)}
        </Route>
    );
};
