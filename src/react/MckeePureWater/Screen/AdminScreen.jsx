import { Grid, Segment, TransitionablePortal } from 'semantic-ui-react';

export const AdminScreen = ({ history }) => {
    console.log('AdminScreen: ', { history });
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

export default AdminScreen;
