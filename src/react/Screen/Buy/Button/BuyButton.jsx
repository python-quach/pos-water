import { Form } from 'semantic-ui-react';

const BuyButton = ({ disabled }) => {
    return (
        <Form.Button
            type='submit'
            size='huge'
            content='Buy'
            style={{
                marginTop: '30px',
                width: '160px',
            }}
            color='green'
            disabled={disabled}
        />
    );
};

export default BuyButton;
