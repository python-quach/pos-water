import { useState, useEffect } from 'react';
import { findMembership, deleteMembership } from '../Api';

import {
    Segment,
    Table,
    Button,
    TransitionablePortal,
    Modal,
    Card,
    Icon,
    Form,
} from 'semantic-ui-react';

const DeleteForm = ({
    setAdminPassword,
    deleteAccount,
    handleDeleteMembership,
    adminPassword,
    setOpenDelete,
}) => (
    <Form>
        <Form.Group>
            <Form.Input
                name='password'
                type='password'
                placeholder='enter password'
                onChange={(event, data) => {
                    event.preventDefault();
                    setAdminPassword(data.value);
                }}
            />
            <Form.Input type='hidden' width={2} />
            <Form.Button
                icon='remove'
                content='Delete'
                color='red'
                onClick={async (e) => {
                    e.preventDefault();
                    handleDeleteMembership({
                        account: deleteAccount.account,
                        password: adminPassword,
                    });
                    setOpenDelete(false);
                }}
            />
            <Form.Button
                type='button'
                color='black'
                content='Cancel'
                onClick={(e) => {
                    e.preventDefault();
                    setOpenDelete(false);
                }}
            />
        </Form.Group>
    </Form>
);

const DeleteDetailCard = ({ record }) => (
    <Card fluid>
        <Card.Content>
            <Card.Header content={record.first + ' ' + record.last} />
            <Card.Meta>
                <span className='date'>MemberSince {record.since}</span>
            </Card.Meta>
            <Card.Description content={`Phone # ${record.phone}`} />
        </Card.Content>
        <Card.Content extra>
            <Icon name='user' />
            Account: {record.account}
        </Card.Content>
    </Card>
);

const SelectButton = ({ account, goToBuyScreen }) => (
    <Button
        size='huge'
        primary
        onClick={async (e) => goToBuyScreen(e, account)}
        content='Select'
    />
);

const DeleteButton = ({ showDeleteModal, record }) => (
    <Button
        type='button'
        content='Delete'
        attached
        size='huge'
        negative
        onClick={(e) => {
            console.log('Delete', record);
            showDeleteModal(e, record);
        }}
    />
);

const DoneButton = ({ closeAccountScreen }) => (
    <Button
        content='Done'
        attached
        color='black'
        size='huge'
        onClick={closeAccountScreen}
    />
);

const DeleteAccountModal = ({
    setOpenDelete,
    openDelete,
    deleteAccount,
    setAdminPassword,
    handleDeleteMembership,
    adminPassword,
}) => (
    <Modal
        basic
        size='tiny'
        dimmer='blurring'
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        onClose={() => setOpenDelete(false)}
        onOpen={() => setOpenDelete(true)}
        open={openDelete}>
        <Modal.Content>
            <DeleteDetailCard record={deleteAccount} />
        </Modal.Content>
        <Modal.Actions>
            <DeleteForm
                setAdminPassword={setAdminPassword}
                deleteAccount={deleteAccount}
                handleDeleteMembership={handleDeleteMembership}
                adminPassword={adminPassword}
                setOpenDelete={setOpenDelete}
            />
        </Modal.Actions>
    </Modal>
);

const AccountTable = ({
    records,
    goToBuyScreen,
    showDeleteModal,
    closeAccountScreen,
    deleteAccount,
    setOpenDelete,
    openDelete,
    adminPassword,
    setAdminPassword,
    handleDeleteMembership,
}) => (
    <Table color='blue' celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Account</Table.HeaderCell>
                <Table.HeaderCell>MemberSince</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Gallon Remain</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {records.map((record, key) => (
                <Table.Row key={key} style={{ fontSize: '20px' }}>
                    <Table.Cell>{record.account}</Table.Cell>
                    <Table.Cell>{record.since}</Table.Cell>
                    <Table.Cell>{record.phone}</Table.Cell>
                    <Table.Cell>
                        {record.first} {record.last}
                    </Table.Cell>
                    <Table.Cell>{record.remain}</Table.Cell>
                    <Table.Cell>
                        {record.date} {record.time}
                    </Table.Cell>
                    <Table.Cell>{record.type}</Table.Cell>
                    <Table.Cell>
                        <Button.Group>
                            <SelectButton
                                account={record.account}
                                goToBuyScreen={goToBuyScreen}
                            />
                            <Button.Or
                                size='huge'
                                style={{ marginTop: '8px' }}
                            />
                            <DeleteButton
                                showDeleteModal={showDeleteModal}
                                record={record}
                            />
                            <Button.Or
                                size='huge'
                                style={{ marginTop: '8px' }}
                            />
                            <DoneButton
                                closeAccountScreen={closeAccountScreen}
                            />
                        </Button.Group>
                        {deleteAccount && (
                            <DeleteAccountModal
                                deleteAccount={deleteAccount}
                                setOpenDelete={setOpenDelete}
                                openDelete={openDelete}
                                handleDeleteMembership={handleDeleteMembership}
                                adminPassword={adminPassword}
                                setAdminPassword={setAdminPassword}
                            />
                        )}
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

function AccountScreen({ raised, style, location, history }) {
    const [open, setOpen] = useState(false);
    const [records, setRecords] = useState(null);
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

    useEffect(() => {
        if (!location.state) {
            history.push('/dashboard');
        } else {
            setRecords(location.state.records);
            setOpen(true);
        }
    }, [location, history]);

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

    return (
        <TransitionablePortal open={open}>
            <Segment raised={raised} style={style}>
                <AccountTable
                    records={records}
                    deleteAccount={deleteAccount}
                    openDelete={openDelete}
                    adminPassword={adminPassword}
                    showDeleteModal={showDeleteModal}
                    goToBuyScreen={goToBuyScreen}
                    closeAccountScreen={closeAccountScreen}
                    setOpenDelete={setOpenDelete}
                    setAdminPassword={setAdminPassword}
                    handleDeleteMembership={handleDeleteMembership}
                />
            </Segment>
        </TransitionablePortal>
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
