import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

// Screen
export const LoginScreen = ({ close, segment, grid, children }) => {
    const { history } = useContext(StoreContext);

    return (
        <TransitionablePortal open={history ? true : false} {...close}>
            <Segment {...segment}>
                <Grid {...grid}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        {children}
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

LoginScreen.defaultProps = {
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
    header: {
        title: 'Mckee Pure Water',
        content: 'Version 1.0',
    },
};

export default LoginScreen;
