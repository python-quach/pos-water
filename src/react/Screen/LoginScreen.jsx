import { useState, useEffect, createContext } from 'react';
import LoginPortal from '../Portal/Portal';
import LoginHeader from '../Header/StoreHeader';
import LoginForm from '../Form/LoginForm';
import { api } from '../../api/api';
import { withRouter } from 'react-router';

export const LoginContext = createContext();

const LoginScreen = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');
    const [save, setSave] = useState(false);

    const handleLogin = async ({ username, password }) => {
        api.login({ username, password }, (auth) => {
            if (!auth) {
                setErrorMessage(true);
            } else {
                history.push({
                    pathname: '/dashboard',
                    state: { user_id: auth.user_id },
                });
            }
        });
    };

    const store = {
        state: {
            errorMessage,
            iconColor,
            save,
        },
        handle: {
            errorMessage: setErrorMessage,
            iconColor: setIconColor,
            save: setSave,
            login: handleLogin,
        },
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <LoginPortal>
            <LoginHeader title='Mckee Pure Water' content='User Login' />
            <LoginContext.Provider value={store}>
                <LoginForm
                // state={{
                //     errorMessage,
                //     iconColor,
                //     save,
                // }}
                // handle={{
                //     errorMessage: setErrorMessage,
                //     iconColor: setIconColor,
                //     save: setSave,
                //     login: handleLogin,
                // }}
                />
            </LoginContext.Provider>
        </LoginPortal>
    );
};

export default withRouter(LoginScreen);
