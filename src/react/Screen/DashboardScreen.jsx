import DashboardPortal from '../Portal/Portal';
import DashBoardHeader from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';

const DashBoardScreen = ({ api, history }) => (
    <DashboardPortal>
        <DashBoardHeader title='Mckee Pure Water' />
        <FindForm api={api} history={history} />
    </DashboardPortal>
);

export default DashBoardScreen;
