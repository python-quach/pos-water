import { useState, useEffect } from 'react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import { Form } from '../Form/Form';
import BuyReceipt from '../Receipt/BuyReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';
import { Button } from '../Button/Button';
import { getCurrentTime, currentDate } from '../../helpers/helpers';

const BuyScreen = ({ api, history }) => {
    const [receipt, setReceipt] = useState(history.location.state || {});
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);

    const renderReceipt = () => {
        if (receipt.renew) return <RenewReceipt receipt={receipt} />;
        if (receipt.buy) return <BuyReceipt receipt={receipt} />;
    };

    const handleDone = () => {
        history.push('/dashboard');
    };

    const resetRenewForm = (form) => {
        form.change('fee', 0);
        form.change('renew', 0);
    };

    const resetBuyForm = (form, previous) => {
        form.change('buy', 0);
        form.change('remain', previous);
    };

    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;

        if (buy)
            api.buy({ ...data, renew: null }, ({ row }) => setReceipt(row));
        if (renew)
            api.renew({ ...data, buy: null, remain: prev + renew }, ({ row }) =>
                setReceipt(row)
            );
    };

    const updateForm = (form, values) => {
        const { buy, renew, remain, record_id } = values;
        if (buy) {
            form.initialize({
                ...values,
                record_id: record_id + 1,
                prev: remain,
                buy: 0,
                invoiceDate: currentDate(),
                invoiceTime: getCurrentTime(),
            });
        }

        if (renew) {
            form.initialize({
                ...values,
                record_id: values.record_id + 1 || '',
                prev: remain + renew,
                remain: remain + renew,
                fee: 0,
                renew: 0,
                invoiceDate: currentDate(),
                invoiceTime: getCurrentTime(),
            });
        }
    };

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');
    });

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <Form.Buy
                history={history}
                api={api}
                onSubmit={onSubmit}
                receipt={receipt}
                renderReceipt={renderReceipt}
                handleDone={handleDone}
                resetBuyForm={resetBuyForm}
                resetRenewForm={resetRenewForm}
                disable={disable}
                setDisable={setDisable}
                edit={edit}
                setEdit={setEdit}
                state={history.location.state}
                updateForm={updateForm}
            />

            <Button.Done edit={edit} handleDone={handleDone} />
        </Portal>
    );
};

export default BuyScreen;
