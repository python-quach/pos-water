import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../store';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

const PurchaseForm = ({ change, field, button }) => {
    const { history, api } = useContext(StoreContext);

    const { account, phone, firstName, lastName, memberSince } =
        history.location.state || {};
    const [receipt, setReceipt] = useState(history.location.state || {});
    const [openReceipt, setOpenReceipt] = useState(false);
    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [open, setOpenPortal] = useState(false);

    // History Page
    const [records, setRecords] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [totalRenew, setTotalRenew] = useState(0);
    const [totalBuy, setTotalBuy] = useState(0);

    // Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const onChange = (_, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const updateHistory = async () => {
        const {
            history,
            totalRenewalFee,
            totalRenew,
            totalBuy,
        } = await api.history({
            account,
            memberSince,
            limit: 10,
            offset: 0,
        });

        setRecords(history);
        setTotalFee(totalRenewalFee);
        setTotalRenew(totalRenew);
        setTotalBuy(totalBuy);
    };

    const buyWater = async (data) => {
        const modifiedData = {
            ...data,
            fullname: data.firstName + ' ' + data.lastName,
            renew: null,
        };
        try {
            const newReceipt = await api.buy(modifiedData);
            const updatedHistory = await api.history({
                ...data,
                limit: 10,
                offset: 0,
            });
            return {
                newReceipt,
                updatedHistory,
            };
        } catch (err) {
            throw err;
        }
    };

    const renewWater = async (data) => {
        const { renew, prev } = data;
        const modifiedData = {
            ...data,
            fullname: data.firstName + ' ' + data.lastName,
            buy: null,
            remain: prev + renew,
        };
        try {
            const newReceipt = await api.renew(modifiedData);
            const updatedHistory = await api.everything({
                ...data,
                limit: 10,
                offset: 0,
            });
            return {
                newReceipt,
                updatedHistory,
            };
        } catch (err) {
            throw err;
        }
    };

    const updateBuyScreen = (data) => {
        const { newReceipt, updatedHistory } = data;
        const {
            history,
            totalRenewalFee,
            totalRenew,
            totalBuy,
        } = updatedHistory;
        setOpenReceipt(true);
        setReceipt(newReceipt);
        setRecords(history);
        setActivePage(1);
        setTotalFee(totalRenewalFee);
        setTotalRenew(totalRenew);
        setTotalBuy(totalBuy);
    };

    const onSubmit = async (data) => {
        try {
            data.buy
                ? updateBuyScreen(await buyWater(data))
                : updateBuyScreen(await renewWater(data));
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
        const date = new Date();
        if (buy) {
            form.initialize({
                ...values,
                record_id: record_id + 1,
                prev: remain,
                buy: 0,
                invoiceDate: date.toLocaleDateString(),
                invoiceTime: date.toLocaleTimeString(),
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
                invoiceDate: date.toLocaleDateString(),
                invoiceTime: date.toLocaleTimeString(),
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
            } = await api.history({
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

    const openHistoryPortal = () => {
        setOpenPortal((prev) => !prev);
        getAllHistory();
    };

    useEffect(() => {
        const getTotalInvoice = async () => {
            console.log('loading History Data');
            try {
                const total = await api.totalInvoices({
                    account,
                    memberSince,
                });
                const {
                    history,
                    totalRenewalFee,
                    totalRenew,
                    totalBuy,
                } = await api.history({
                    account,
                    memberSince,
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

        if (!totalPages) getTotalInvoice();
    }, [totalPages, setTotalPages, account, offset, memberSince]);

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');
        const getTotalInvoice = async () => {
            try {
                const response = await api.history({
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
        <FinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            initialValuesEqual={() => true}
            render={({ handleSubmit, form, values }) => (
                <Form
                    size='huge'
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => {
                            updateForm(form, values);
                            document.getElementById('buy').focus();
                        });
                    }}>
                    <Form.Group>
                        {change.buy(values)}
                        {field.account}
                        {field.since}
                        {field.areaCode}
                        {field.phone}
                        {field.fullname}
                        {field.first}
                        {field.last}
                        {!edit && button.edit}
                        {edit && button.cancel(form, values)}
                        {edit && button.save(form, values)}
                        {field.date}
                        {field.time}
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={13} />
                        {field.buy(form)}
                        {field.remain(values.remain)}
                        {button.buy(values)}
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={13} />
                        {field.fee(form, values)}
                        {field.gallon(form, values)}
                        {button.renew(values)}
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default PurchaseForm;
