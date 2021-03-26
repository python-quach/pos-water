import { useState, useEffect } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
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
    // console.log(history.location.state);
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
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const data = history.location.state;

    const updateHistory = () => {
        api.history(
            {
                account,
                limit: 10,
                offset: 0,
                phone,
                firstName,
                lastName,
                memberSince,
            },
            (response) => {
                setRecords(response);
            }
        );
    };

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');
    });

    useEffect(() => {
        if (!totalPages && data)
            api.totalInvoices(
                { account: data.account, firstName, lastName, memberSince },
                (response) => {
                    setTotalPages(response);
                    // api.totalFee(data.account, (response) => {
                    api.totalFee(
                        {
                            account: data.account,
                            firstName,
                            lastName,
                            memberSince,
                        },
                        (response) => {
                            // console.log('totalFee', response);
                            setTotalFee(response);
                            api.totalRenew(
                                {
                                    account: data.account,
                                    firstName,
                                    lastName,
                                    memberSince,
                                },
                                (response) => {
                                    // console.log('totalRenew', response);
                                    setTotalRenew(response);
                                    api.totalBuy(
                                        {
                                            account: data.account,
                                            firstName,
                                            lastName,
                                            memberSince,
                                        },
                                        (response) => {
                                            // console.log('totalBuy', response);
                                            setTotalBuy(response);
                                        }
                                    );
                                }
                            );
                        }
                    );
                    api.history(
                        {
                            account: data.account,
                            limit: 10,
                            offset: offset,
                            phone,
                            firstName,
                            lastName,
                            memberSince,
                        },
                        (response) => {
                            setRecords(response);
                        }
                    );
                }
            );
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

    useEffect(() => {
        if (open)
            api.history(
                {
                    account: data.account,
                    limit: 10,
                    offset: offset,
                    phone,
                    firstName,
                    lastName,
                    memberSince,
                },
                (response) => {
                    setRecords(response);
                }
            );

        if (!open) {
            setOffset(0);
            setActivePage(1);
            setTotalPages(0);
        }
    }, [offset, data, open, phone, firstName, lastName, memberSince]);

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    return (
        <Portal {...config}>
            <Header as='h1' inverted size='huge' textAlign='left'>
                <Icon name='braille' color='blue' />
                <Header.Content>
                    Mckee Pure Water
                    <Header.Subheader content='Buy and Renew' />
                </Header.Content>
            </Header>
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
