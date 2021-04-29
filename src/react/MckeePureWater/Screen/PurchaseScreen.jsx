import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

export const PurchaseScreen = ({ history }) => {
    console.log('PurchaseScreen:', { history });
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

export default PurchaseScreen;
