import { useEffect } from 'react';
import { TransitionablePortal, Segment, Grid, Header } from 'semantic-ui-react';

export const AdminLoginScreen = ({ history }) => {
    console.log(history);
    useEffect(() => {
        if (!history.location.state) history.push('/');
    });

    return (
        <TransitionablePortal open={history.location.state ? true : false}>
            <Segment
                style={{
                    margin: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header>Admin Login Portal</Header>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default AdminLoginScreen;
