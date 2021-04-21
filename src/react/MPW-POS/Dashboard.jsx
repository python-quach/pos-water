import Header from './Header';
import Screen from './Screen';
import Form from './Form';

export const Dashboard = () => (
    <Screen name='dashboard'>
        <Header />
        <Form.Find />
    </Screen>
);

export default Dashboard;
