import { Button } from 'semantic-ui-react';
import DashboardPortal from '../Portal/Portal';
import DashBoardHeader from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';

const DashBoardScreen = ({ api, history }) => (
    <DashboardPortal>
        <DashBoardHeader title='Mckee Pure Water' />
        <FindForm api={api} history={history} />
        <Button content='Back' onClick={() => history.push('/')} />
    </DashboardPortal>
);

export default DashBoardScreen;
