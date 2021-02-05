import { useEffect, useState } from 'react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';

const BuyScreen = ({ api, history }) => {
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleDone = () => history.push('/dashboard');
    const handleEdit = (form, values) => {
        console.log('handleEdit', { form, values });
    };

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <Form.Buy
                history={history}
                api={api}
                edit={edit}
                setEdit={setEdit}
                disable={disable}
                handleEdit={handleEdit}
                setDisable={setDisable}
            />
            <Form.Renew
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            />
            <Button.Done handleDone={handleDone} />
            <Button.Edit
                edit={edit}
                setEdit={setEdit}
                handleEdit={handleEdit}
            />
        </Portal>
    );
};

export default BuyScreen;
