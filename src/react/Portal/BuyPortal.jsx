import { TransitionablePortal, Segment, Grid } from 'http-cache-semantics';
const BuyPortal = ({ open, handleClose, children }) => {
    return (
        <TransitionablePortal
            open={open}
            onClose={handleClose}
            closeOnTriggerClick
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
            openOnTriggerClick>
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>{children}</Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default BuyPortal;
