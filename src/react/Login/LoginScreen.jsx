import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { channels } from '../../shared/constants';
import { Form } from 'react-final-form';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
const { ipcRenderer } = window;

const LoginScreen = (props) => {
    console.log(props);
    const [appVersion, setAppVersion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [iconColor, setIconColor] = useState('blueIcon');

    const clearInvalidLoginButton = () => {
        if (errorMessage) setErrorMessage('');
    };

    const renderLoginForm = ({ handleSubmit, form, values }) => (
        <LoginForm
            form={form}
            handleSubmit={handleSubmit}
            values={values}
            onSubmit={onSubmit}
            iconColor={iconColor}
            errorMessage={errorMessage}
        />
    );

    const onSubmit = async ({ password, username }) => {
        ipcRenderer.send(channels.APP_INFO, { username, password });
        ipcRenderer.on(channels.APP_INFO, (event, { appVersion }) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            setAppVersion(appVersion);
        });
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <LoginHeader title='Mckee Pure Water' appVersion={appVersion} />
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    render={renderLoginForm}
                />
            </Grid.Column>
        </Grid>
    );
};

export default LoginScreen;
