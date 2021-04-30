import Portal from '../Portal/DashboardPortal';
import Header from '../Header/DashboardHeader';
import Form from '../Form/DashboardForm';

const DashboardScreen = ({ history }) => (
    <Portal open={history ? true : false}>
        <Header title='Mckee Pure Water' content='Dashboard' />
        <Form />
    </Portal>
);

export default DashboardScreen;
