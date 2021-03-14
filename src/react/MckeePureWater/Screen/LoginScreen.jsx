import { useState } from 'react';
import {
    Segment,
    TransitionablePortal,
    Grid,
    Header,
    Icon,
    Divider,
} from 'semantic-ui-react';
import LoginForm from '../Form/LoginForm';
import { channels } from '../../../shared/constants';
const { ipcRenderer } = window;

const LoginScreen = (props) => {
    const { setOpenLogin, setOpenDashBoard } = props;
    const [error, setError] = useState(false);

    const onSubmit = async (values) => {
        ipcRenderer.send(channels.LOGIN, values);
        ipcRenderer.on(channels.LOGIN, (_, { login }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (login) {
                console.log('User Login Successfully:', { login });
                setError(false);
                setOpenLogin(false);
                setOpenDashBoard(true);
            } else {
                console.log('Invalid Credential:', { login });
                setError(true);
                document.getElementById('username').focus();
            }
        });
    };

    return (
        <TransitionablePortal open={true}>
            <Segment
                raised
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Senter Pure Water
                                <Header.Subheader content='Dashboard' />
                            </Header.Content>
                        </Header>
                        <Divider />
                        <LoginForm
                            onSubmit={onSubmit}
                            error={error}
                            setError={setError}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default LoginScreen;
