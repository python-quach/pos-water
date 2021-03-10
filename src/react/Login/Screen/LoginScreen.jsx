import { useState, useEffect, createContext } from 'react';
import Portal from '../../Portal/Portal';
import { api } from '../../../api/api';
import { withRouter } from 'react-router';
import Header from '../Header/LoginHeader';
import Form from '../Form/LoginForm';

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
        api,
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
        initialValues: { username: '', password: '' },
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <LoginContext.Provider value={store}>
            <Portal>
                <Header title='Mckee Pure Water' content='User Login' />
                <Form size='large' history={history} />
            </Portal>
        </LoginContext.Provider>
    );
};

export default withRouter(LoginScreen);
