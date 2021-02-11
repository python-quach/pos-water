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
import Record from '../Portal/RecordPortal';

const BuyScreen = ({ api, history }) => {
    const [receipt, setReceipt] = useState(history.location.state || {});
    const [records, setRecord] = useState(0);
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpenPortal] = useState(false);

    // Pagination;
    const [totalPages, setTotalPages] = useState(0);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const data = history.location.state;
    const initialValues = {
        ...data,
        record_id: data ? data.record_id + 1 : '',
        prev: data ? data.remain : '',
        buy: 0,
        fee: 0,
        renew: 0,
        invoiceDate: currentDate(),
        invoiceTime: currentTime(),
    };

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
                api.history(
                    { account: data.account, limit: 10, offset: 0 },
                    (response) => {
                        setRecord(response);
                        setActivePage(1);
                    }
                );
            });
        }

        if (renew) {
            api.renew(
                { ...data, buy: null, remain: prev + renew },
                ({ row }) => {
                    setReceipt(row);
                    api.history(
                        { account: data.account, limit: 10, offset: 0 },
                        (response) => {
                            setRecord(response);
                            setActivePage(1);
                        }
                    );
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
        if (open)
            api.history(
                {
                    account: data.account,
                    limit: 10,
                    offset: offset,
                },
                (response) => {
                    setRecord(response);
                }
            );

        if (!open) {
            setOffset(0);
            setActivePage(1);
        }
    }, [offset, data, api, open]);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    useEffect(() => {
        if (!totalPages && data.account)
            api.totalInvoices({ account: data.account }, (response) => {
                setTotalPages(response);
            });
    }, [totalPages, api, setTotalPages, data]);

    return (
        <Portal {...config}>
            <Receipt receipt={receipt} />
            <Divider />
            <Form.Buy
                history={history}
                api={api}
                state={{
                    initialValues,
                    disable,
                    edit,
                    data,
                }}
                initialValues={initialValues}
                disable={disable}
                edit={edit}
                handle={{
                    onSubmit,
                    renderReceipt,
                    handleDone,
                    resetBuyForm,
                    resetRenewForm,
                    setEdit,
                    setDisable,
                    updateForm,
                }}
            />
            <Divider />
            <Button.Done edit={edit} handleDone={handleDone} />
            <Button.History
                content={open ? 'Close' : 'History'}
                color={open ? 'red' : 'teal'}
                disabled={edit}
                floated='right'
                type='button'
                style={{
                    marginTop: '10px',
                    width: '100px',
                }}
                onClick={() => {
                    setOpenPortal((prev) => !prev);
                    if (open)
                        api.history(
                            {
                                account: data.account,
                                limit: 10,
                                offset: 0,
                            },
                            (response) => {
                                setRecord(response);
                            }
                        );
                }}
            />
            <Record
                // edit={edit}
                records={records}
                totalPages={totalPages}
                open={open}
                onChange={onChange}
                activePage={activePage}
            />
        </Portal>
    );
};

export default BuyScreen;
