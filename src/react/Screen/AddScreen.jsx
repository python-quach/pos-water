import { useEffect } from 'react';
import Portal from '../Portal/Portal';
import { AddPortalConfig as config } from '../../config/portal';
import AddForm from '../Form/AddForm';

const AddScreen = (props) => {
    const { history, api } = props;
    const record = history.location.state;

    useEffect(() => {
        if (!record) history.push('/dashboard');
    });

    return (
        <Portal {...config}>
            <AddForm api={api} history={history} record={record} />
        </Portal>
    );
};

export default AddScreen;
