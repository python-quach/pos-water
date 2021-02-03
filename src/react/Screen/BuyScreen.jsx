import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import BuyForm from '../Form/BuyForm';

const BuyScreen = ({ api, history }) => (
    <Portal {...config}>
        <BuyForm history={history} api={api} />
    </Portal>
);

export default BuyScreen;
