import { Modal, Table, Card, Form, Icon } from 'semantic-ui-react';
import BuyReceipt from '../Receipt/BuyReceipt';
import NewReceipt from '../Receipt/NewReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';

const DeleteAccountModal = ({ setOpenDelete, openDelete, card, form }) => (
    <Modal
        basic
        size='large'
        dimmer='blurring'
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        onClose={() => setOpenDelete(false)}
        onOpen={() => setOpenDelete(true)}
        open={openDelete}>
        <Modal.Content>{card}</Modal.Content>
        <Modal.Actions>{form}</Modal.Actions>
    </Modal>
);

const ConfirmModal = ({ open, setOpen, record, setOpenReceipt }) => {
    return (
        <Modal
            basic
            dimmer='blurring'
            size='fullscreen'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Purchase Record</Modal.Header>
            <Modal.Content>
                <Table size='large' celled inverted selectable color='blue'>
                    {record.type === 'NEW' && (
                        <NewReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                        />
                    )}
                    {record.type === 'BUY' && (
                        <BuyReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                            setOpenReceipt={setOpenReceipt}
                        />
                    )}
                    {record.type === 'RENEW' && (
                        <RenewReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                            setOpenReceipt={setOpenReceipt}
                        />
                    )}
                </Table>
            </Modal.Content>
        </Modal>
    );
};

const AdminModal = ({
    open,
    setOpenDeleteModal,
    record,
    setAdminPassword,
    deleteMembership,
    close,
}) => {
    return (
        <Modal
            basic
            // dimmer='blurring'
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            onClose={() => setOpenDeleteModal(false)}
            onOpen={() => setOpenDeleteModal(true)}
            open={open}>
            <Modal.Content>
                <Card fluid>
                    <Card.Content>
                        <Card.Header
                            content={record.first + ' ' + record.last}
                        />
                        <Card.Meta>
                            <span className='date'>
                                MemberSince {record.since}
                            </span>
                        </Card.Meta>
                        <Card.Description content={`Phone # ${record.phone}`} />
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />
                        Account: {record.account}
                    </Card.Content>
                </Card>
            </Modal.Content>
            <Modal.Actions>
                <Form>
                    <Form.Group>
                        <Form.Input type='hidden' width={8} />
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='enter password'
                            onChange={(event, data) => {
                                event.preventDefault();
                                setAdminPassword(data.value);
                            }}
                            width={5}
                        />
                        <Form.Button
                            type='button'
                            content='Delete'
                            color='red'
                            onClick={deleteMembership}
                        />
                        <Form.Button
                            color='black'
                            content='Cancel'
                            onClick={close}
                        />
                    </Form.Group>
                </Form>
            </Modal.Actions>
        </Modal>
    );
};

const DefaultModal = {
    DeleteAccount: DeleteAccountModal,
    Confirm: ConfirmModal,
    Admin: AdminModal,
};

export default DefaultModal;
