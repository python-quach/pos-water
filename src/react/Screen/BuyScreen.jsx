import { useEffect, useState } from 'react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';

const BuyScreen = ({ api, history }) => {
    const [disable, setDisable] = useState(false);

    const handleDone = () => history.push('/dashboard');

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <Form.Buy
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            />
            <Form.Renew
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            />
            <Button.Done handleDone={handleDone} />
        </Portal>
    );
};

export default BuyScreen;
