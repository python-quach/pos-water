import { useState, useEffect } from 'react';
import {
    Segment,
    TransitionablePortal,
    Divider,
    Header,
    Button as SButton,
} from 'semantic-ui-react';
import { currentTime, currentDate } from '../../helpers/helpers';
import { BuyPortalConfig as config } from '../../config/portal';
import { Form } from '../Form/Form';
import { Button } from '../Button/Button';
import Portal from '../Portal/Portal';
import RecordPortal from '../Portal/RecordPortal';
import BuyReceipt from '../Receipt/BuyReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';
import Receipt from '../Receipt/Receipt';
import Record from '../Record/Record';

const BuyScreen = ({ api, history }) => {
    const [openReceipt, setOpenReceipt] = useState(false);

    const [receipt, setReceipt] = useState(history.location.state || {});
    const [records, setRecord] = useState(0);
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpenPortal] = useState(false);
    const [totalFee, setTotalFee] = useState(0);
    const [totalRenew, setTotalRenew] = useState(0);
    const [totalBuy, setTotalBuy] = useState(0);

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
        record_id: data ? data.newRecordID : '',
        prev: data ? data.remain : '',
        buy: 0,
        fee: 0,
        renew: 0,
        invoiceDate: currentDate(),
        invoiceTime: currentTime(),
    };

    const updateHistory = () => {
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
            api.buy({ ...data, renew: null }, (data) => {
                setReceipt(data);
                setOpenReceipt(true);
                api.history(
                    { account: data.account, limit: 10, offset: 0 },
                    (response) => {
                        setRecord(response);
                        setActivePage(1);
                        api.totalFee(data.account, (response) => {
                            console.log('totalFee', response);
                            setTotalFee(response);
                            api.totalRenew(data.account, (response) => {
                                console.log('totalRenew', response);
                                setTotalRenew(response);
                                api.totalBuy(data.account, (response) => {
                                    console.log('totalBuy', response);
                                    setTotalBuy(response);
                                    // setRecord(response);
                                });
                            });
                        });
                    }
                );
            });
        }

        if (renew) {
            api.renew({ ...data, buy: null, remain: prev + renew }, (data) => {
                setReceipt(data);
                setOpenReceipt(true);
                api.history(
                    { account: data.account, limit: 10, offset: 0 },
                    (response) => {
                        setRecord(response);
                        setActivePage(1);
                        api.totalFee(data.account, (response) => {
                            console.log('totalFee', response);
                            setTotalFee(response);
                            api.totalRenew(data.account, (response) => {
                                console.log('totalRenew', response);
                                setTotalRenew(response);
                                api.totalBuy(data.account, (response) => {
                                    console.log('totalBuy', response);
                                    setTotalBuy(response);
                                });
                            });
                        });
                    }
                );
            });
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
        if (!totalPages && data)
            api.totalInvoices({ account: data.account }, (response) => {
                setTotalPages(response);
                api.totalFee(data.account, (response) => {
                    console.log('totalFee', response);
                    setTotalFee(response);
                    api.totalRenew(data.account, (response) => {
                        console.log('totalRenew', response);
                        setTotalRenew(response);
                        api.totalBuy(data.account, (response) => {
                            console.log('totalBuy', response);
                            setTotalBuy(response);
                        });
                    });
                });
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
            });
    }, [totalPages, api, setTotalPages, data, offset]);

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
            setTotalPages(0);
        }
    }, [offset, data, api, open]);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <TransitionablePortal
                closeOnDocumentClick={false}
                closeOnEscape={false}
                closeOnDimmerClick={false}
                closeOnPortalMouseLeave={false}
                open={openReceipt}>
                <Segment
                    style={{
                        left: '15%',
                        position: 'fixed',
                        top: '30%',
                        zIndex: 1000,
                    }}>
                    <Header>Receipt</Header>
                    <Receipt
                        receipt={receipt}
                        setOpenReceipt={setOpenReceipt}
                    />
                </Segment>
            </TransitionablePortal>
            {!openReceipt ? (
                <Receipt receipt={receipt} setOpenReceipt={setOpenReceipt} />
            ) : null}
            <Divider hidden />
            <Divider />
            <Divider hidden />
            <Form.Buy
                history={history}
                api={api}
                state={{
                    initialValues,
                    disable,
                    edit,
                    data,
                    receipt,
                }}
                totalFee={totalFee}
                totalRenew={totalRenew}
                totalBuy={totalBuy}
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
                    setReceipt,
                    updateHistory,
                }}
            />
            <Divider />
            <Divider hidden />
            <Button.Done edit={edit} handleDone={handleDone} />
            <Button.History
                content={open ? 'Close' : 'History'}
                color={open ? 'red' : 'teal'}
                disabled={edit}
                floated='right'
                type='button'
                onClick={() => {
                    setOpenPortal((prev) => !prev);
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
                }}
            />
            <RecordPortal open={open}>
                <Header>{data.fullname} Record History</Header>
                <SButton
                    color='red'
                    content='Total Fee'
                    icon='dollar'
                    label={{
                        basic: true,
                        color: 'red',
                        pointing: 'left',
                        content: totalFee,
                    }}
                />
                <SButton
                    color='blue'
                    content='Total Renew'
                    icon='tint'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'left',
                        content: totalRenew,
                    }}
                />
                <SButton
                    color='green'
                    content='Total Buy'
                    icon='cart'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'green',
                        pointing: 'left',
                        content: totalBuy,
                    }}
                />
                <Record
                    records={records}
                    totalPages={totalPages}
                    onChange={onChange}
                    activePage={activePage}
                    totalFee={totalFee}
                    totalRenew={totalRenew}
                    totalBuy={totalBuy}
                />
            </RecordPortal>
        </Portal>
    );
};

export default BuyScreen;
