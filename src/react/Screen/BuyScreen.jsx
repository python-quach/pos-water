import { useEffect, useState } from 'react';
import { Divider } from 'semantic-ui-react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
// import { Button } from '../Button/Button';
import { Form } from '../Form/Form';

const BuyScreen = ({ api, history }) => {
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

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
                loading={loading}
                setEdit={setEdit}
                setLoading={setLoading}
                disable={disable}
                handleEdit={handleEdit}
                setDisable={setDisable}
                handleDone={handleDone}
            />
            {/* <Form.Renew
                history={history}
                api={api}
                disable={disable}
                setDisable={setDisable}
            /> */}
            <Divider hidden />
            {/* <Button.Done handleDone={handleDone} edit={edit} />
            <Button.Edit
                edit={edit}
                loading={loading}
                setEdit={setEdit}
                handleEdit={handleEdit}
                setLoading={setLoading}
            /> */}
        </Portal>
    );
};

export default BuyScreen;
