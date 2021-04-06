import { Form } from 'semantic-ui-react';

const DoneButton = ({ values }) => {
    return (
        <Form.Button
            size='huge'
            type='submit'
            content='Done'
            color='facebook'
            // style={{ marginTop: '30px', width: '130px' }}
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
