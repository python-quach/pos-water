import { useState, useEffect } from 'react';
import { Divider } from 'semantic-ui-react';
import { BuyPortalConfig as config } from '../../../../config/portal';

import BuyForm from '../Form/BuyForm';
import Portal from '../../../Portal/Portal';
import RecordPortal from '../Portal/RecordPortal';
import Receipt from '../../../Receipt/Receipt';
import Record from '../Record/Record';
import DoneButton from '../Button/DoneButton';
import HistoryButton from '../Button/HistoryButton';
import ReceiptPortal from '../Portal/ReceiptPortal';
import { api, mckeeApi } from '../../../../api/api';

import Header from '../Header/StoreHeader';

const BuyScreen = ({ history }) => {
    const { account, phone, firstName, lastName, memberSince } =
        history.location.state || {};

    const [openReceipt, setOpenReceipt] = useState(false);
    const [receipt, setReceipt] = useState(history.location.state || {});
    const [records, setRecords] = useState(0);

    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpenPortal] = useState(false);

    const [totalFee, setTotalFee] = useState(0);
    const [totalRenew, setTotalRenew] = useState(0);
    const [totalBuy, setTotalBuy] = useState(0);

    // Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const onChange = (e, pageInfo) => {
        console.log('onchange');
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const data = history.location.state;

    const updateHistory = async () => {
        const {
            history,
            totalRenewalFee,
            totalRenew,
            totalBuy,
        } = await mckeeApi.everything({
            account,
            phone,
            firstName,
            lastName,
            memberSince,
            limit: 10,
            offset: 0,
        });

        setRecords(history);
        setTotalFee(totalRenewalFee);
        setTotalRenew(totalRenew);
        setTotalBuy(totalBuy);
    };

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');
    });

    useEffect(() => {
        const getTotalInvoice = async () => {
            try {
                const total = await mckeeApi.totalInvoices({
                    account: data.account,
                    firstName,
                    lastName,
                    memberSince,
                });
                const {
                    history,
                    totalRenewalFee,
                    totalRenew,
                    totalBuy,
                } = await mckeeApi.everything({
                    ...data,
                    limit: 10,
                    offset: offset,
                });
                setTotalPages(total);
                setRecords(history);
                setTotalFee(totalRenewalFee);
                setTotalRenew(totalRenew);
                setTotalBuy(totalBuy);
            } catch (err) {
                return console.log(err);
            }
        };

        if (!totalPages && data) getTotalInvoice();
    }, [
        totalPages,
        setTotalPages,
        data,
        offset,
        phone,
        firstName,
        lastName,
        memberSince,
    ]);

    const getAllHistory = async () => {
        try {
            const {
                history,
                totalRenewalFee,
                totalRenew,
                totalBuy,
            } = await mckeeApi.everything({
                account,
                phone,
                firstName,
                lastName,
                memberSince,
                limit: 10,
                offset: offset,
            });
            setRecords(history);
            setTotalFee(totalRenewalFee);
            setTotalRenew(totalRenew);
            setTotalBuy(totalBuy);
        } catch (err) {
            return console.log(err);
        }
    };

    useEffect(() => {
        const getTotalInvoice = async () => {
            try {
                // const { history } = await mckeeApi.everything({
                //     ...data,
                //     limit: 10,
                //     offset: offset,
                // });
                // setRecords(history);

                const {
                    history,
                    totalRenewalFee,
                    totalRenew,
                    totalBuy,
                } = await mckeeApi.everything({
                    account,
                    phone,
                    firstName,
                    lastName,
                    memberSince,
                    limit: 10,
                    offset: offset,
                });

                setRecords(history);
                setTotalFee(totalRenewalFee);
                setTotalRenew(totalRenew);
                setTotalBuy(totalBuy);
            } catch (err) {
                return console.log(err);
            }
        };

        if (open) getTotalInvoice();

        if (!open) {
            setOffset(0);
            setActivePage(1);
            setTotalPages(0);
        }
    }, [account, offset, data, open, phone, firstName, lastName, memberSince]);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;

        try {
            if (buy) {
                const response = await mckeeApi.buy({ ...data, renew: null });
                const {
                    history,
                    totalRenewalFee,
                    totalRenew,
                    totalBuy,
                } = await mckeeApi.everything({
                    ...data,
                    limit: 10,
                    offset: 0,
                });

                setOpenReceipt(true);
                setReceipt(response);
                setRecords(history);
                setActivePage(1);
                setTotalFee(totalRenewalFee);
                setTotalRenew(totalRenew);
                setTotalBuy(totalBuy);
            }

            if (renew) {
                const response = await mckeeApi.renew({
                    ...data,
                    buy: null,
                    remain: prev + renew,
                });

                const {
                    history,
                    totalRenewalFee,
                    totalRenew,
                    totalBuy,
                } = await mckeeApi.everything({
                    ...data,
                    limit: 10,
                    offset: 0,
                });

                console.log(
                    history,
                    totalRenewalFee,
                    totalRenewalFee,
                    totalBuy
                );

                setOpenReceipt(true);
                setReceipt(response);
                setRecords(history);
                setActivePage(1);
                setTotalFee(totalRenewalFee);
                setTotalRenew(totalRenew);
                setTotalBuy(totalBuy);
            }
        } catch (err) {
            return console.log(err);
        }
    };

    const date = new Date();
    const initialValues = {
        ...receipt,
        record_id: receipt ? receipt.newRecordID : '',
        prev: receipt ? receipt.remain : '',
        buy: 0,
        fee: 0,
        renew: 0,
        invoiceDate: date.toLocaleDateString(),
        invoiceTime: date.toLocaleTimeString(),
    };

    return (
        <Portal {...config}>
            <Header title='Mckee Pure Water' content='Buy and Renew' />

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
                onSubmit={onSubmit}
                field={{}}
                button={{}}
                initialValues={initialValues}
                receipt={receipt}
                setOpenReceipt={setOpenReceipt}
                setReceipt={setReceipt}
                setRecord={setRecords}
                setActivePage={setActivePage}
                setTotalFee={setTotalFee}
                setTotalRenew={setTotalRenew}
                setTotalBuy={setTotalBuy}
                setDisable={setDisable}
                setEdit={setEdit}
                updateHistory={updateHistory}
                disable={disable}
                edit={edit}
            />

            <Divider />
            <Divider hidden />
            <DoneButton
                edit={edit}
                handleDone={() => history.push('/dashboard')}
            />
            <HistoryButton
                getHistory={getAllHistory}
                open={open}
                setOpenPortal={setOpenPortal}
                api={api}
                setRecord={setRecords}
                data={data}
                offset={offset}
                edit={edit}
                size='huge'
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
