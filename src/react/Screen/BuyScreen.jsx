import { useEffect, useState } from 'react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import BuyForm from '../Form/BuyForm';
import RenewForm from '../Form/RenewForm';

const BuyScreen = ({ api, history }) => {
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <BuyForm
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            />
            <RenewForm
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            />
        </Portal>
    );
};

export default BuyScreen;
