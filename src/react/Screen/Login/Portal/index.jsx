import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

const Portal = ({
    children,
    open,
    animation,
    duration,
    segment,
    grid,
    gridColumn,
    close,
}) => (
    <TransitionablePortal
        open={open}
        {...close}
        transition={{ animation, duration }}>
        <Segment style={{ ...segment }}>
            <Grid {...grid}>
                <Grid.Column {...gridColumn}>{children}</Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

Portal.defaultProps = {
    close: {
        closeOnDocumentClick: false,
        closeOnEscape: false,
        closeOnDimmerClick: false,
        closeOnPortalMouseLeave: false,
    },
    open: true,
    animation: 'zoom',
    duration: 500,
    segment: {
        margin: 0,
        height: '100%',
        overflow: 'hidden',
        zIndex: 1000,
        backgroundColor: '#002b487d',
    },
    grid: {
        textAlign: 'center',
        style: { height: '100vh' },
        verticalAlign: 'middle',
    },
    gridColumn: {
        style: { maxWidth: 450 },
    },
};

export default Portal;
