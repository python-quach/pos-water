import { Form } from 'semantic-ui-react';

const BuyButton = ({ values, disable }) => {
    return (
        <Form.Button
            size='huge'
            content='Buy'
            style={{
                marginTop: '30px',
                width: '160px',
            }}
            color='green'
            disabled={values.buy <= 0 || disable}
        />
    );
};

export default BuyButton;
