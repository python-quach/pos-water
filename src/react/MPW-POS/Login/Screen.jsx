import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

// Screen
export const LoginScreen = ({ open, segment, grid, children }) => (
    <TransitionablePortal open={open}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column style={{ maxWidth: 450 }}>{children}</Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

LoginScreen.defaultProps = {
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
    header: {
        title: 'Mckee Pure Water',
        content: 'Version 1.0',
    },
};

export default LoginScreen;
