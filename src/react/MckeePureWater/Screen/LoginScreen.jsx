import { Segment, Header, TransitionablePortal, Grid } from 'semantic-ui-react';
import LoginForm from '../Form/LoginForm';
import { channels } from '../../../shared/constants';
const { ipcRenderer } = window;

const LoginScreen = (props) => {
    const onSubmit = async (values) => {
        ipcRenderer.send(channels.LOGIN, values);
        ipcRenderer.on(channels.LOGIN, (_, { login }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (login) {
                props.setOpenLogin(false);
                props.setOpenDashBoard(true);
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
                    // backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        {/* <Header size='huge' block>
                            Login Screen
                        </Header> */}
                        <LoginForm onSubmit={onSubmit} />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default LoginScreen;
