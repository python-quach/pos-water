import { useState, useEffect } from 'react';
import { Divider } from 'semantic-ui-react';
import { BuyPortalConfig as config } from '../../../../config/portal';
import { currentTime, currentDate } from '../../../../helpers/helpers';

import BuyForm from '../Form/BuyForm';

import Portal from '../../../Portal/Portal';
import RecordPortal from '../Portal/RecordPortal';
import Receipt from '../../../Receipt/Receipt';
import Record from '../Record/Record';
import ReceiptPortal from '../Portal/ReceiptPortal';
import BuyGallon from '../Field/BuyGallon';
import GallonRemain from '../Field/GallonRemain';
import RenewAmount from '../Field/RenewAmount';
import Fee from '../Field/Fee';
import Button from '../Button/Button';
import Field from '../Field';
import Header from '../Header/StoreHeader';

import { api, mckeeApi } from '../../../../api/api';
import { FormSpy, Field as FinalField } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
    <FinalField name={set} subscription={{}}>
        {({ input: { onChange } }) => (
            <FormSpy subscription={{}}>
                {() => (
                    <OnChange name={field}>
                        {() => (becomes ? onChange(to) : onChange(reset))}
                    </OnChange>
                )}
            </FormSpy>
        )}
    </FinalField>
);

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

    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;
        console.log('onSubmit', data);

        try {
            if (buy) {
                console.log(data);
                const response = await mckeeApi.buy({
                    ...data,
                    fullname: data.firstName + ' ' + data.lastName,
                    renew: null,
                });
                console.log(response);
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
                    fullname: data.firstName + ' ' + data.lastName,
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

    const resetBuyForm = (form, previous) => {
        form.change('buy', 0);
        form.change('remain', previous);
    };

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

    const resetOffset = () => {
        setOffset(0);
        setActivePage(1);
        setTotalPages(0);
    };

    const updateHistoryPage = (data) => {
        const { history, totalRenewalFee, totalRenew, totalBuy } = data;
        setRecords(history);
        setTotalFee(totalRenewalFee);
        setTotalRenew(totalRenew);
        setTotalBuy(totalBuy);
    };

    useEffect(() => {
        const getTotalInvoice = async () => {
            console.log('loading History Data');
            try {
                const total = await mckeeApi.totalInvoices({
                    account: data.account,
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
    }, [totalPages, setTotalPages, data, offset, memberSince]);

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');

        const getTotalInvoice = async () => {
            try {
                const response = await mckeeApi.everything({
                    account,
                    memberSince,
                    limit: 10,
                    offset: offset,
                });

                updateHistoryPage(response);
            } catch (err) {
                return console.log(err);
            }
        };

        open ? getTotalInvoice() : resetOffset();
        document.getElementById('buy').focus();

        return () => console.log('BuyScreen clean up');
    }, [account, offset, open, memberSince, history]);

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
                initialValues={initialValues}
                updateForm={updateForm}
                edit={edit}
                field={{
                    account: <Field.Account edit={edit} />,
                    since: <Field.Since edit={edit} />,
                    areaCode: <Field.AreaCode edit={edit} />,
                    phone: (
                        <Field.Phone
                            error={!edit ? false : true}
                            readOnly={!edit}
                        />
                    ),
                    fullname: <Field.Fullname />,
                    first: <Field.FirstName error={edit} readOnly={!edit} />,
                    last: <Field.LastName error={edit} readOnly={!edit} />,
                    date: <Field.Date edit={edit} />,
                    time: <Field.Time edit={edit} />,
                    buy: (form) => (
                        <BuyGallon
                            disabled={edit}
                            onFocus={() => {
                                form.change('fee', 0);
                                form.change('renew', 0);
                                if (disable) setDisable(false);
                            }}
                        />
                    ),
                    remain: (remain) => (
                        <GallonRemain
                            disabled={edit}
                            error={remain < 0 ? true : false}
                        />
                    ),
                    fee: (form, values) => (
                        <Fee
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.keyCode === 13) &&
                                values.fee > 0 &&
                                values.renew > 0
                                    ? form.submit().then(() => {
                                          updateForm(form, values);
                                          document
                                              .getElementById('buy')
                                              .focus();
                                      })
                                    : null
                            }
                            onFocus={() => {
                                resetBuyForm(form, values.prev);
                            }}
                            disabled={edit}
                        />
                    ),
                    gallon: (form, values) => (
                        <RenewAmount
                            onKeyPress={(e) =>
                                (e.key === 'Enter' || e.keyCode === 13) &&
                                values.fee > 0 &&
                                values.renew > 0
                                    ? form.submit().then(() => {
                                          updateForm(form, values);
                                          document
                                              .getElementById('buy')
                                              .focus();
                                      })
                                    : null
                            }
                            onFocus={() => {
                                resetBuyForm(form, values.prev);
                            }}
                            disabled={edit}
                        />
                    ),
                }}
                button={{
                    edit: (
                        <Button.Edit
                            onClick={() => setEdit((prevEdit) => !prevEdit)}
                            style={{ marginTop: '30px' }}
                        />
                    ),
                    cancel: (form, values) => (
                        <Button.Cancel
                            onClick={() => {
                                form.reset({
                                    ...initialValues,
                                    prev: values.prev,
                                    remain: values.remain,
                                    buy: values.buy,
                                    fee: values.fee,
                                    renew: values.renew,
                                });
                                setEdit(false);
                            }}
                            style={{
                                marginTop: '30px',
                            }}
                        />
                    ),
                    save: (form, values) => (
                        <Button.Save
                            disabled={
                                values.areaCode && values.phone
                                    ? values.areaCode.length < 3 ||
                                      values.phone.length < 8
                                    : true
                            }
                            onClick={() => {
                                const { firstName, lastName } = values;
                                if (!edit) {
                                    setEdit(true);
                                } else {
                                    const data = {
                                        ...values,
                                        fullname: firstName + ' ' + lastName,
                                    };
                                    form.change(
                                        'fullname',
                                        firstName + ' ' + lastName
                                    );
                                    api.edit(data, (result) => {
                                        setReceipt(result);
                                        updateHistory();
                                        setEdit(false);
                                    });
                                }
                            }}
                            style={{
                                marginTop: '30px',
                            }}
                        />
                    ),
                    buy: ({ buy }) => (
                        <Button.Buy
                            disabled={buy <= 0 || disable}
                            style={{
                                marginTop: '30px',
                                width: '160px',
                            }}
                        />
                    ),
                    renew: ({ fee, renew }) => (
                        <Button.Renew
                            disabled={!fee || !renew}
                            style={{ marginTop: '30px', width: '160px' }}
                        />
                    ),
                }}
                change={{
                    buy: (values) => (
                        <WhenBuyFieldChanges
                            field='buy'
                            becomes={values.buy > 0}
                            set='remain'
                            to={parseInt(values.prev - values.buy)}
                            reset={values.prev}
                        />
                    ),
                }}
            />
            <Divider />
            <Divider hidden />
            <Button.Done
                disabled={edit}
                style={{
                    width: '160px',
                }}
                onClick={() => history.push('/dashboard')}
            />
            <Button.History
                open={open}
                disabled={edit}
                onClick={() => {
                    setOpenPortal((prev) => !prev);
                    getAllHistory();
                }}
                style={{ width: '160px', marginRight: '15px' }}
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
