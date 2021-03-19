import { Form } from 'semantic-ui-react';

export const RenewButton = ({ disabled, setOpenReceipt }) => (
    <Form.Button
        disabled={disabled}
        style={{ marginTop: '30px', width: '250px' }}
        icon='redo'
        labelPosition='right'
        content='Renew'
        primary
        size='huge'
        onClick={() => {
            setOpenReceipt(false);
        }}
    />
);
