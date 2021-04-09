import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Account = ({ edit }) => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='account'
                label='Account'
                className='BuyAccount'
                placeholder='xxxxxx'
                icon='hashtag'
                iconPosition='left'
                readOnly
                inverted
                disabled={edit}
                width={2}
            />
        )}
    />
);

export default Account;
