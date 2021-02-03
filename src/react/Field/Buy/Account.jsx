import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Account = (props) => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='account'
                readOnly
                label='Account'
                className='BuyAccount'
                placeholder='xxxxxx'
                inverted
                icon='hashtag'
                iconPosition='left'
                width={2}
            />
        )}
    />
);

export default Account;
