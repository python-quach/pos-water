import { useEffect } from 'react';
import Screen from './Screen';
import Header from './Header';
import Form from './Form';

// DASHBOARD
export const Dashboard = ({ history }) => {
    useEffect(() => {
        if (!history.location.state) history.push('/');
        console.log('Dashboard', { history });
    }, [history]);

    return (
        <Screen open={history.location.state ? true : false}>
            <Header />
            <Form history={history} />
        </Screen>
    );
};

export default Dashboard;
