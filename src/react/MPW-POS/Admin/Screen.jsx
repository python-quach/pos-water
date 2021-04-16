import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';
import { useEffect } from 'react';

import Screen from './Screen';
import Header from './Header';
import { AdminLoginForm } from './Form';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AdminScreen = ({ open, segment, grid, children, size, close }) => (
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

export const AdminPasswordScreen = ({ history }) => {
    const onSubmit = async (values) => {
        if (values.password === '911') {
            await sleep(500);
            history.push({ pathname: '/admin', state: true });
        } else {
            throw new Error('Invalid Password');
        }
    };

    useEffect(() => {
        if (!history.location.state) history.push('/');
    });

    useEffect(() => {
        const input = document.getElementById('password');
        if (input) input.focus();
    }, []);

    return (
        <Screen open={history.location.state ? true : false} size={600}>
            <Header />
            <AdminLoginForm
                onSubmit={onSubmit}
                cancel={() => history.push('/')}
            />
        </Screen>
    );
};

export default AdminScreen;
