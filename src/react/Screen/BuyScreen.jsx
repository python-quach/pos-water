import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import { Form } from '../Form/Form';

const BuyScreen = ({ api, history }) => (
    <Portal {...config}>
        <Form.Buy history={history} api={api} />
    </Portal>
);

export default BuyScreen;
