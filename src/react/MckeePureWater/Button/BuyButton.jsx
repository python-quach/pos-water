import { Form } from 'semantic-ui-react';

export const BuyButton = ({ disabled, setOpenReceipt }) => (
    <Form.Button
        disabled={disabled}
        style={{ width: '250px', marginTop: '30px' }}
        content='Buy'
        icon='cart'
        labelPosition='right'
        positive
        size='huge'
        onClick={() => {
            setOpenReceipt(false);
        }}
    />
);
