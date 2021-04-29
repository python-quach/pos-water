import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

export const AddScreen = ({ history }) => {
    console.log('AddScreen: ', { history });
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

export default AddScreen;
