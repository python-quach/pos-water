import {
    Segment,
    Table,
    Button,
    Label,
    TransitionablePortal,
    Modal,
    Card,
    Icon,
    Form,
} from 'semantic-ui-react';

const AdminModal = (props) => {
    return (
        <Modal
            basic
            size='tiny'
            dimmer='blurring'
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            onClose={() => props.setOpenDelete(false)}
            onOpen={() => props.setOpenDelete(true)}
            open={props.openDelete}>
            <Modal.Content>
                {/* <Card centered> */}
                <Card fluid>
                    {/* <pre>{JSON.stringify(props.deleteAccount, 0, 2)}</pre> */}
                    <Card.Content>
                        <Card.Header>
                            {props.deleteAccount.first +
                                ' ' +
                                props.deleteAccount.last}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                MemberSince {props.deleteAccount.since}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            Phone # {props.deleteAccount.phone}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />
                        Account: {props.deleteAccount.account}
                    </Card.Content>
                </Card>
            </Modal.Content>
            <Modal.Actions>
                <Form>
                    <Form.Group>
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='enter password'
                            onChange={(event, data) => {
                                event.preventDefault();
                                props.setAdminPassword(data.value);
                            }}
                        />
                        <Form.Input type='hidden' width={2} />
                        <Form.Button
                            icon='remove'
                            content='Delete'
                            color='red'
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log(
                                    'Delete Account',
                                    props.deleteAccount.account
                                );
                                props.handleDeleteMembership({
                                    account: props.deleteAccount.account,
                                    password: props.adminPassword,
                                });
                                props.setOpenDelete(false);
                            }}
                        />
                        <Form.Button
                            color='black'
                            content='Cancel'
                            onClick={(e) => {
                                props.setOpenDelete(false);
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Actions>
        </Modal>
    );
};

const AccountScreen = ({
    records,
    find,
    setOpenAccountScreen,
    open,
    setOpenDashBoard,
    setOpenDelete,
    openDelete,
    deleteAccount,
    setDeleteAccount,
    handleDeleteMembership,
    setOpenDeleteConfirm,
    openDeleteConfirm,
    adminPassword,
    setAdminPassword,
}) => {
    return (
        <TransitionablePortal open={open}>
            <Segment
                raised
                style={{
                    height: '100vh',
                    overflow: 'scroll',
                    backgroundColor: '#002b487d',
                }}>
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
                                <Table.Cell>
                                    <Label size='huge' color='blue'>
                                        {record.account}
                                    </Label>
                                </Table.Cell>
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
                                        <Button
                                            size='huge'
                                            primary
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log(
                                                    'select',
                                                    record.account
                                                );
                                                find({
                                                    account: record.account,
                                                });
                                                setOpenAccountScreen(false);
                                            }}>
                                            Select
                                        </Button>
                                        <Button.Or
                                            size='huge'
                                            style={{ marginTop: '8px' }}
                                        />
                                        <Button
                                            attached
                                            size='huge'
                                            negative
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setDeleteAccount(record);
                                                setOpenDelete(true);
                                            }}>
                                            Delete
                                        </Button>
                                        <Button.Or
                                            size='huge'
                                            style={{ marginTop: '8px' }}
                                        />
                                        <Button
                                            attached
                                            color='black'
                                            size='huge'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpenAccountScreen(false);
                                                setOpenDashBoard(true);
                                            }}>
                                            Done
                                        </Button>
                                    </Button.Group>
                                    {deleteAccount && (
                                        <AdminModal
                                            deleteAccount={deleteAccount}
                                            setOpenDelete={setOpenDelete}
                                            openDelete={openDelete}
                                            handleDeleteMembership={
                                                handleDeleteMembership
                                            }
                                            adminPassword={adminPassword}
                                            setAdminPassword={setAdminPassword}
                                        />
                                    )}

                                    {/* <Modal
                                        dimmer='blurring'
                                        onClose={() =>
                                            setOpenDeleteConfirm(false)
                                        }
                                        onOpen={() =>
                                            setOpenDeleteConfirm(true)
                                        }
                                        open={openDeleteConfirm}>
                                        <Modal.Header>
                                            Delete Account: {deleteAccount}
                                        </Modal.Header>
                                        <Modal.Content image>
                                            <Form.Input
                                                type='password'
                                                name='password'
                                                label='Enter Password'
                                                onChange={(event, data) => {
                                                    event.preventDefault();
                                                    setAdminPassword(
                                                        data.value
                                                    );
                                                }}
                                            />
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button
                                                content='Submit'
                                                color='red'
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    handleDeleteMembership({
                                                        account: deleteAccount,
                                                        password: adminPassword,
                                                    });
                                                    setOpenDeleteConfirm(false);
                                                }}
                                            />
                                            <Button
                                                color='black'
                                                content='Cancel'
                                                labelPosition='right'
                                                icon='checkmark'
                                                onClick={() => {
                                                    setOpenDeleteConfirm(false);
                                                    setOpenDelete(false);
                                                }}
                                            />
                                        </Modal.Actions>
                                    </Modal> */}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        </TransitionablePortal>
    );
};

export default AccountScreen;
