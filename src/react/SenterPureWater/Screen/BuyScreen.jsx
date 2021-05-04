import { useState, useEffect } from 'react';
import CustomerHistory from './History/CustomerHistory';
import Receipt from './Receipt';
import Portal from './Portal';
import { renew, buy, deleteMembership, editMembership } from '../Api';
import { BuyForm } from './Form';
import { BuyScreenButton as Button } from './Button';
import { BuyScreenField as Field } from './Field';
import Modal from './Modal';

const BuyScreen = (props) => {
    const { state } = props.location;
    const [error, setError] = useState(false);

    const [open, setOpen] = useState(state ? true : false);
    const [history, setHistory] = useState(state ? state.history : []);
    const [record, setRecord] = useState(state ? state.record : {});
    const [edit, setEdit] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');

    const openDelete = (e) => {
        e.preventDefault();
        setOpenDeleteModal(true);
    };

    const closeDelete = (e) => {
        e.preventDefault();
        setOpenDeleteModal(false);
    };

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const handlePurchase = async (values) => {
        try {
            if (values.gallon !== 0 && values.fee !== 0) {
                const { history } = await renew(values);
                const lastRecord = history[history.length - 1];
                setRecord(lastRecord);
                setHistory(history);
                setOpenConfirm(true);
                return lastRecord;
            } else {
                const { history } = await buy(values);
                const lastRecord = history[history.length - 1];
                setRecord(lastRecord);
                setHistory(history);
                setOpenConfirm(true);
                return lastRecord;
            }
        } catch (err) {
            return err;
        }
    };

    const handleDeleteMembership = async () => {
        try {
            const { auth } = await deleteMembership({
                account: record.account,
                password: adminPassword,
            });

            if (auth) {
                props.history.push('/dashboard');
            }
        } catch (err) {
            setOpenDeleteModal(true);
            setAdminPassword('');
            return err;
        }
    };

    const handleEdit = async (values) => {
        console.log(values.account, record.account);
        try {
            const data = await editMembership({
                ...values,
                originalAccount: record.account,
            });
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setError(false);
                setRecord(data[data.length - 1]);
                setHistory(data);
            }
            return data;
        } catch (err) {
            return console.log(err);
        }
    };

    const openHistoryModal = (e) => {
        e.preventDefault();
        setOpenHistory(true);
    };

    const closeBuyScreen = (e) => {
        e.preventDefault();
        props.history.push('/dashboard');
    };

    const receipt = (
        <Receipt open={openReceipt} record={record} setOpen={() => {}} />
    );

    const field = {
        account: <Field.Account edit={edit} error={error} />,
        since: <Field.MemberSince edit={edit} />,
        phone: <Field.PhoneNumber edit={edit} />,
        first: <Field.FirstName edit={edit} />,
        last: <Field.LastName edit={edit} />,
        date: <Field.TodayDate edit={edit} />,
        time: <Field.CurrentTime edit={edit} />,
        buy: <Field.Buy edit={edit} />,
        remain: (values) => <Field.Remain edit={edit} values={values} />,
        fee: <Field.Fee edit={edit} />,
        renew: <Field.Renew edit={edit} />,
    };

    const button = {
        edit: (values) => (
            <Button.Edit
                edit={edit}
                handleEdit={handleEdit}
                originalAccount={record.account}
                values={values}
                setEdit={setEdit}
                setOpenReceipt={setOpenReceipt}
            />
        ),
        cancel: (form, values) => (
            <Button.Cancel
                record={record}
                setEdit={setEdit}
                form={form}
                values={values}
            />
        ),
        buy: (values) => (
            <Button.Buy
                disabled={values.buy <= 0}
                setOpenReceipt={setOpenReceipt}
            />
        ),
        renew: (values) => (
            <Button.Renew
                setOpenReceipt={setOpenReceipt}
                disabled={values.gallon <= 0 || values.fee <= 0}
            />
        ),
        history: <Button.History open={openHistoryModal} />,
        delete: <Button.Delete open={openDelete} />,
        done: <Button.Done close={closeBuyScreen} />,
    };

    const modal = {
        admin: (
            <Modal.Admin
                record={record}
                open={openDeleteModal}
                close={closeDelete}
                deleteMembership={handleDeleteMembership}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
            />
        ),
        confirm: (
            <Modal.Confirm
                open={openConfirm}
                record={record}
                setOpen={setOpenConfirm}
                setOpenReceipt={setOpenReceipt}
            />
        ),
    };

    const form = (
        <BuyForm
            handlePurchase={handlePurchase}
            edit={edit}
            record={record}
            handleEdit={handleEdit}
            onKeyDown={onKeyDown}
            setOpenReceipt={setOpenReceipt}
            changeField={(values) => (
                <Field.ChangeField values={values} record={record} />
            )}
            field={field}
            button={button}
            modal={modal}
        />
    );

    useEffect(() => {
        if (!props.location.state) {
            props.history.push('/dashboard');
        } else {
            setOpen(true);
        }
    }, [history, props]);

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Portal.Buy
            open={open}
            receipt={receipt}
            form={form}
            history={
                <CustomerHistory
                    records={history}
                    open={openHistory}
                    setOpenHistory={setOpenHistory}
                />
            }
        />
    );
};

export default BuyScreen;
