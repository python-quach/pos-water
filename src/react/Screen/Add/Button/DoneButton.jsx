import { Form } from 'semantic-ui-react';

const DoneButton = ({ values }) => {
    return (
        <Form.Button
            primary
            size='huge'
            type='submit'
            content='Done'
            style={{ marginTop: '30px' }}
            disabled={
                !values.fee ||
                !values.renew ||
                !values.firstName ||
                !values.lastName ||
                !values.phone ||
                !values.areaCode ||
                values.areaCode.length < 3 ||
                values.phone.length < 8 ||
                !values.account
            }
        />
    );
};

export default DoneButton;
