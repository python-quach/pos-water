import { Modal } from 'semantic-ui-react';

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

const DefaultModal = {
    DeleteAccount: DeleteAccountModal,
};

export default DefaultModal;
