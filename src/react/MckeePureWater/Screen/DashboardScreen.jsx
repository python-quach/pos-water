import { Grid, Segment, TransitionablePortal } from 'semantic-ui-react';

export const DashboardScreen = ({ history }) => {
    console.log('DashboardScreen: ', { history });
    return (
        <TransitionablePortal>
            <Segment>
                <Grid>
                    <Grid.Column></Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default DashboardScreen;
