import {
    Segment,
    Header,
    Table,
    Button,
    Label,
    TransitionablePortal,
    Modal,
    Image,
} from 'semantic-ui-react';

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
    setRecords,
    handleDeleteMembership,
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
                {/* <Header size='huge' block>
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
                </Header> */}
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
                                            // fluid
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
                                                setDeleteAccount(
                                                    record.account
                                                );
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
                                    <Modal
                                        dimmer='blurring'
                                        onClose={() => setOpenDelete(false)}
                                        onOpen={() => setOpenDelete(true)}
                                        open={openDelete}>
                                        <Modal.Header>
                                            User Admin Screen
                                        </Modal.Header>
                                        <Modal.Content image>
                                            <Image
                                                size='medium'
                                                src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
                                                wrapped
                                            />
                                            <Modal.Description>
                                                <Header>
                                                    Admin Screen:{deleteAccount}
                                                </Header>
                                                <p>
                                                    We've found the following
                                                    gravatar image associated
                                                    with your e-mail address.
                                                </p>
                                                <p>
                                                    Is it okay to use this
                                                    photo?
                                                </p>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button
                                                content='Delete'
                                                color='red'
                                                onClick={async (e) => {
                                                    handleDeleteMembership({
                                                        account: deleteAccount,
                                                        password: '911',
                                                    });
                                                }}
                                            />
                                            <Button
                                                color='black'
                                                content='Cancel'
                                                labelPosition='right'
                                                icon='checkmark'
                                                onClick={() =>
                                                    setOpenDelete(false)
                                                }
                                            />
                                        </Modal.Actions>
                                    </Modal>
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
