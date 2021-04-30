import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

const DashboardPortal = ({ open, children }) => (
    <TransitionablePortal
        open={open}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}>
        <Segment
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
                style={{
                    height: '100vh',
                }}>
                <Grid.Column style={{ maxWidth: 450 }}>{children}</Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

export default DashboardPortal;
