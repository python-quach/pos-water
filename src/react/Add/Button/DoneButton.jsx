import { Form } from 'semantic-ui-react';

const DoneButton = ({ values }) => {
    return (
        <Form.Button
            size='massive'
            type='submit'
            content='Done'
            color='facebook'
            style={{ marginTop: '30px' }}
            disabled={
                !values.fee ||
                !values.renew ||
                !values.firstName ||
                !values.lastName ||
                !values.phone ||
                !values.areaCode ||
                !values.account
            }
        />
    );
};

export default DoneButton;
