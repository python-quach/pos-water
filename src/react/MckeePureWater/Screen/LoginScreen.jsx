import { TransitionablePortal, Segment, Grid, Header } from 'semantic-ui-react';

export const LoginScreen = ({ history }) => {
    console.log('LoginScreen:', { history });

    return (
        <TransitionablePortal open={history ? true : false}>
            <Segment>
                <Grid>
                    <Grid.Column>
                        <Header>
                            <Header.Content>Mckee Pure Water</Header.Content>
                            <Header.Subheader>User Login</Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default LoginScreen;
