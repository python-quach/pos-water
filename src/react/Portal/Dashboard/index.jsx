import Header from '../../MPW-POS/Header';
import Screen from '../../MPW-POS/Screen';
import Form from '../../MPW-POS/Form';

export const Dashboard = () => (
    <Screen name='dashboard'>
        <Header />
        <Form.Find />
    </Screen>
);

export default Dashboard;
