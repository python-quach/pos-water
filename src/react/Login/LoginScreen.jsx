import { useState } from 'react';
import {
    Header,
    Icon,
    Grid,
    Divider,
    Form as Login,
    Message,
} from 'semantic-ui-react';
import { Form, Field } from 'react-final-form';
import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

const LoginScreen = (props) => {
    const [appVersion, setAppVersion] = useState('');
    const onSubmit = async (values) => {
        console.log(values);
        ipcRenderer.send(channels.APP_INFO, values);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            const { appVersion } = arg;
            setAppVersion(appVersion);
        });
    };

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' inverted size='huge' textAlign='left'>
                    <Icon name='braille' color='blue' />
                    <Header.Content>
                        Mckee Pure Water
                        <Header.Subheader>
                            Version {appVersion}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
                <Divider hidden />
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                    }) => (
                        <>
                            <Login onSubmit={handleSubmit}>
                                <Field
                                    name='username'
                                    component={Login.Input}
                                    type='text'
                                />
                                <Field
                                    name='password'
                                    component={Login.Input}
                                    type='password'
                                />
                                <button className='ui button' type='submit'>
                                    Login
                                </button>
                            </Login>
                            <Message>
                                <Message.Content>
                                    {JSON.stringify(values, 0, 2)}
                                </Message.Content>
                            </Message>
                        </>
                    )}></Form>
            </Grid.Column>
        </Grid>
    );
};

export default LoginScreen;
