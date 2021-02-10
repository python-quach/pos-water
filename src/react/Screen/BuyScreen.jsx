import { useState, useEffect } from 'react';
import { Divider } from 'semantic-ui-react';
import { BuyPortalConfig as config } from '../../config/portal';
import Portal from '../Portal/Portal';
import { Form } from '../Form/Form';
import BuyReceipt from '../Receipt/BuyReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';
import { Button } from '../Button/Button';
import { currentTime, currentDate } from '../../helpers/helpers';
import Receipt from '../Receipt/Receipt';

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

        if (buy) {
            api.buy({ ...data, renew: null }, ({ row }) => {
                setReceipt(row);
            });
        }

        if (renew) {
            api.renew(
                { ...data, buy: null, remain: prev + renew },
                ({ row }) => {
                    setReceipt(row);
                }
            );
        }
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
                invoiceTime: currentTime(),
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
                invoiceTime: currentTime(),
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
            <Receipt receipt={receipt} />
            <Divider />
            <Form.Buy
                history={history}
                api={api}
                receipt={receipt}
                disable={disable}
                edit={edit}
                state={history.location.state}
                onSubmit={onSubmit}
                renderReceipt={renderReceipt}
                handleDone={handleDone}
                resetBuyForm={resetBuyForm}
                resetRenewForm={resetRenewForm}
                setEdit={setEdit}
                setDisable={setDisable}
                updateForm={updateForm}
            />
            <Button.Done edit={edit} handleDone={handleDone} />
            <Button.History
                content='History'
                color='teal'
                disabled={edit}
                floated='right'
                type='button'
                style={{
                    marginTop: '10px',
                    width: '100px',
                }}
            />
        </Portal>
    );
};

export default BuyScreen;
