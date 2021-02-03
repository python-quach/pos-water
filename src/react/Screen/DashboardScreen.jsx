import DashboardPortal from '../Portal/Portal';
import DashBoardHeader from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';
import AddButton from '../Button/AddButton';
import ReportButton from '../Button/ReportButton';
import LogoutButton from '../Button/LogoutButton';

const DashBoardScreen = ({ api, history }) => (
    <DashboardPortal>
        <DashBoardHeader title='Mckee Pure Water' content='Dashboard' />
        <FindForm api={api} history={history} />
        <AddButton />
        <ReportButton />
        <LogoutButton logout={() => history.push('/')} />
    </DashboardPortal>
);

export default DashBoardScreen;
