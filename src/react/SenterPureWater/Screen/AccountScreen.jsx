import { useState, useEffect } from 'react';
import { findMembership, deleteMembership } from '../Api';
import Portal from './Portal';
import Header from './Header';
import Button from './Button';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';
import Card from './Card';
import Field from './Field';

function AccountScreen({ location, history }) {
    const [open, setOpen] = useState(location.state ? true : false);
    const [records, setRecords] = useState(
        location.state ? location.state.records : []
    );
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [adminPassword, setAdminPassword] = useState('');

    const handleDeleteMembership = async (values) => {
        const { account, password } = values;
        try {
            const { auth } = await deleteMembership({
                account,
                password,
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
    };

    const handleDelete = async () => {
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
    };

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
            console.log('cleaned up');
        };
    }, []);

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
        admin: (
            <Button.AdminDelete
                handleDeleteMembership={handleDeleteMembership}
                deleteAccount={deleteAccount}
                adminPassword={adminPassword}
                setOpenDelete={setOpenDelete}
            />
        ),
        cancel: <Button.AdminCancel setOpenDelete={setOpenDelete} />,
    };

    const form = (
        <Form.Delete
            field={<Field.AdminPassword setAdminPassword={setAdminPassword} />}
            button={adminButton}
            deleteAccount={deleteAccount}
            onSubmit={handleDelete}
            handleDeleteMembership={handleDeleteMembership}
            adminPassword={adminPassword}
            setOpenDelete={setOpenDelete}
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

    return (
        <Portal.Account open={open} header={<Header.Senter />} table={table} />
    );
}

AccountScreen.defaultProps = {
    raised: true,
    style: {
        height: '100vh',
        overflow: 'scroll',
        backgroundColor: '#002b487d',
    },
};

export default AccountScreen;
