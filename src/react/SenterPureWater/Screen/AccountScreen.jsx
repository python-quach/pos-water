import { useState, useEffect } from 'react';
import { findMembership, deleteMembership } from '../Api';
import Portal from './Portal';
import Header from './Header';
import { AccountScreenButton as Button } from './Button';
import { AccountScreenField as Field } from './Field';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';
import Card from './Card';

function AccountScreen({ location, history }) {
    const [open, setOpen] = useState(location.state ? true : false);
    const [records, setRecords] = useState(
        location.state ? location.state.records : []
    );
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [adminPassword, setAdminPassword] = useState('');

    async function handleDelete() {
        const { account } = deleteAccount;
        try {
            const { auth } = await deleteMembership({
                account,
                password: adminPassword,
            });
            if (auth) {
                setRecords((prevRecords) =>
                    prevRecords.filter((record) => record.account !== account)
                );
                setOpenDelete(false);
                setAdminPassword('');
            }
        } catch (err) {
            setOpenDelete(true);
            setAdminPassword('');
        }
    }

    async function goToBuyScreen(e, account) {
        e.preventDefault();
        try {
            const data = await findMembership({ account });
            history.push({
                pathname: '/buy',
                state: data,
            });
        } catch (err) {
            return console.log(err);
        }
    }

    function closeAccountScreen(e) {
        e.preventDefault();
        history.push('/dashboard');
    }

    function showDeleteModal(e, record) {
        e.preventDefault();
        setDeleteAccount(record);
        setOpenDelete(true);
    }

    useEffect(() => {
        if (!location.state) {
            history.push('/dashboard');
        }
    }, [location, history]);

    useEffect(() => {
        if (!Array.isArray(records) || !records.length) {
            history.push('/dashboard');
        }
    }, [setOpen, records, history]);

    useEffect(() => {
        return () => {
            // console.log('cleaned up');
        };
    }, []);

    const button = {
        select: (account) => (
            <Button.Select goToBuyScreen={goToBuyScreen} account={account} />
        ),
        delete: (record) => (
            <Button.Delete showDeleteModal={showDeleteModal} record={record} />
        ),
        done: <Button.Done closeAccountScreen={closeAccountScreen} />,
    };

    const adminButton = {
        admin: <Button.ConfirmDelete />,
        cancel: <Button.Cancel setOpenDelete={setOpenDelete} />,
    };

    const form = (
        <Form.Delete
            onSubmit={handleDelete}
            field={<Field.Password setAdminPassword={setAdminPassword} />}
            button={adminButton}
        />
    );

    const card = <Card.DeleteDetail record={deleteAccount} />;
    const modal = (
        <Modal.DeleteAccount
            card={card}
            form={form}
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
        />
    );
    const table = (
        <Table.Account
            records={records}
            button={button}
            modal={modal}
            deleteAccount={deleteAccount}
        />
    );

    const header = <Header.Senter />;

    return <Portal.Account open={open} header={header} table={table} />;
}

export default AccountScreen;
