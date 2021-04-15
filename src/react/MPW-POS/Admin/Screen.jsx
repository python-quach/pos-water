import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

const AdminScreen = ({ open, segment, grid, children, size, close }) => (
    <TransitionablePortal open={open} {...close}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column style={{ maxWidth: size }}>{children}</Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

AdminScreen.defaultProps = {
    close: {
        closeOnDocumentClick: false,
        closeOnEscape: false,
        closeOnDimmerClick: false,
        closeOnPortalMouseLeave: false,
    },
    segment: {
        style: {
            margin: 0,
            height: '100%',
            overflow: 'hidden',
            zIndex: 1000,
            backgroundColor: '#002b487d',
        },
    },
    grid: {
        textAlign: 'center',
        verticalAlign: 'middle',
        style: {
            height: '100vh',
        },
    },
};

export default AdminScreen;
