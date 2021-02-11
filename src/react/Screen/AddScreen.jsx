import { useEffect, useState } from 'react';
import Portal from '../Portal/Portal';
import { Button } from 'semantic-ui-react';
import { AddPortalConfig as config } from '../../config/portal';
import { currentTime, currentDate } from '../../helpers/helpers';
import AddForm from '../Form/AddForm';

const AddScreen = (props) => {
    const {
        api: { lastRecord },
        history,
    } = props;

    const [record, setLastRecord] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (!record)
            lastRecord(({ record_id }) => {
                console.log({ record_id });
                setLastRecord(record_id);
            });
    }, [record, lastRecord]);

    useEffect(() => {
        setInitialValues({
            record_id: record,
            areaCode: '',
            phone: '',
            firstName: '',
            lastName: '',
            memberSince: currentDate(),
            account: '',
            fee: 0,
            prev: 0,
            buy: 0,
            renew: 0,
            invoiceDate: currentDate(),
            invoiceTime: currentTime(),
        });
    }, [setInitialValues, record]);

    return (
        <Portal {...config}>
            <AddForm
                api={props.api}
                history={props.history}
                initialValues={initialValues}
                onSubmit={() => console.log('add')}
            />
        </Portal>
    );
};

export default AddScreen;
