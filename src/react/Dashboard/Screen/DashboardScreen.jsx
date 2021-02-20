import { Divider } from 'semantic-ui-react';
import { api } from '../../../api/api';
import Portal from '../Portal/Portal';
import Header from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';
import AddButton from '../Button/AddButton';
import ReportButton from '../Button/ReportButton';
import LogoutButton from '../Button/LogoutButton';

const DashBoardScreen = ({ history }) => {
    const addNewMembership = () => {
        api.lastRecord(({ record_id }) => {
            history.push({ pathname: '/add', state: record_id });
        });
    };

    const logout = () => {
        history.push('/');
    };

    return (
        <Portal>
            <Header title='Mckee Pure Water' content='Dashboard' />
            <FindForm api={api} history={history} />
            <Divider hidden />
            <AddButton add={addNewMembership} />
            <Divider hidden />
            <ReportButton />
            <Divider hidden />
            <LogoutButton logout={logout} />
        </Portal>
    );
};

export default DashBoardScreen;
