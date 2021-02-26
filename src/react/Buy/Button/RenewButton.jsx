import { Form } from 'semantic-ui-react';

const RenewButton = ({ values }) => (
    <Form.Button
        type='submit'
        content='Renew'
        color='facebook'
        size='huge'
        style={{ marginTop: '30px', width: '160px' }}
        disabled={!values.fee || !values.renew}
    />
);

export default RenewButton;
