import { useState, useEffect } from 'react';
import { Divider } from 'semantic-ui-react';
import { currentTime, currentDate } from '../../../helpers/helpers';
import { BuyPortalConfig as config } from '../../../config/portal';
import BuyForm from '../Form/BuyForm';
import Portal from '../../Portal/Portal';
import RecordPortal from '../Portal/RecordPortal';

import Receipt from '../../Receipt/Receipt';
import Record from '../Record/Record';
import DoneButton from '../Button/DoneButton';
import HistoryButton from '../Button/HistoryButton';
import ReceiptPortal from '../Portal/ReceiptPortal';
import { api } from '../../../api/api';

const BuyScreen = ({ history }) => {
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
    }, [totalPages, setTotalPages, data, offset]);

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
    }, [offset, data, open]);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            {openReceipt ? (
                <ReceiptPortal openReceipt={openReceipt}>
                    <Receipt
                        receipt={receipt}
                        openReceipt={openReceipt}
                        setOpenReceipt={setOpenReceipt}
                    />
                </ReceiptPortal>
            ) : (
                <Receipt
                    receipt={receipt}
                    setOpenReceipt={setOpenReceipt}
                    openReceipt={openReceipt}
                />
            )}
            <Divider hidden />
            <Divider />
            <Divider hidden />
            <BuyForm
                receipt={receipt}
                setOpenReceipt={setOpenReceipt}
                setReceipt={setReceipt}
                setRecord={setRecord}
                setActivePage={setActivePage}
                setTotalFee={setTotalFee}
                setTotalRenew={setTotalRenew}
                setTotalBuy={setTotalBuy}
                setDisable={setDisable}
                setEdit={setEdit}
                updateHistory={updateHistory}
                disable={disable}
                resetBuyForm={resetBuyForm}
                updateForm={updateForm}
                resetRenewForm={resetRenewForm}
                edit={edit}
            />
            <Divider />
            <Divider hidden />
            <DoneButton edit={edit} handleDone={handleDone} />
            <HistoryButton
                open={open}
                setOpenPortal={setOpenPortal}
                api={api}
                setRecord={setRecord}
                data={data}
                offset={offset}
                edit={edit}
                size='massive'
            />
            <RecordPortal
                data={data}
                open={open}
                totalBuy={totalBuy}
                totalFee={totalFee}
                totalRenew={totalRenew}>
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
