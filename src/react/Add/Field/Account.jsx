import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 10) return onlyNums;
    return parseInt(onlyNums.slice(0, 9));
};

const Account = ({ width, setError, setErrorMessage, error, errorMessage }) => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='account'
                error={error ? errorMessage : false}
                label='Account'
                className='BuyAccount'
                placeholder='xxxxxx'
                icon='hashtag'
                iconPosition='left'
                inverted
                width={width}
                onFocus={() => {
                    setError(false);
                    setErrorMessage('');
                }}
            />
        )}
    />
);

export default Account;
