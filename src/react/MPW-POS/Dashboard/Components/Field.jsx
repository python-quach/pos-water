import { useContext } from 'react';
import { StoreContext } from '../../store';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

// FIELD
export const PhoneField = ({ form }) => {
    const { setError, normalize } = useContext(StoreContext);
    return (
        <Field
            name='phone'
            parse={normalize.phone}
            render={({ input }) => (
                <Form.Input
                    className='blueIcon'
                    id='phone'
                    placeholder='xxx-xxxx'
                    focus
                    type='text'
                    size='massive'
                    icon='whatsapp'
                    fluid
                    iconPosition='left'
                    transparent
                    value={input.value}
                    name={input.name}
                    onFocus={() => {
                        form.change('account', '');
                        form.change('firstName', '');
                        form.change('lastName', '');
                    }}
                    onChange={(e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};
export const AccountField = ({ form }) => {
    const { setError, normalize } = useContext(StoreContext);
    return (
        <Field
            name='account'
            parse={normalize.account}
            render={({ input }) => (
                <Form.Input
                    className='blueIcon'
                    id='account'
                    type='text'
                    placeholder='account #'
                    size='massive'
                    focus
                    fluid
                    icon='credit card'
                    iconPosition='left'
                    transparent
                    spellCheck='false'
                    inverted
                    value={input.value}
                    name={input.name}
                    onFocus={() => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('firstName', '');
                            form.change('lastName', '');
                        });
                    }}
                    onChange={(e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};
export const FirstNameField = ({ form }) => {
    const { setError } = useContext(StoreContext);
    return (
        <Field
            name='firstName'
            render={({ input }) => (
                <Form.Input
                    placeholder='first name'
                    className='blueIcon'
                    icon='user circle'
                    iconPosition='left'
                    size='massive'
                    spellCheck='false'
                    fluid
                    focus
                    transparent
                    inverted
                    value={input.value}
                    name={input.name}
                    onFocus={() => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('account', '');
                        });
                    }}
                    onChange={(e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};
export const LastNameField = ({ form }) => {
    const { setError } = useContext(StoreContext);
    return (
        <Field
            name='lastName'
            render={({ input }) => (
                <Form.Input
                    placeholder='last name'
                    className='blueIcon'
                    icon='user circle'
                    iconPosition='left'
                    size='massive'
                    spellCheck='false'
                    fluid
                    focus
                    transparent
                    inverted
                    value={input.value}
                    name={input.name}
                    onFocus={() => {
                        form.batch(() => {
                            form.change('phone', '');
                            form.change('account', '');
                        });
                    }}
                    onChange={(e, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};

const DashboardField = {
    Phone: PhoneField,
    Account: AccountField,
    FirstName: FirstNameField,
    LastName: LastNameField,
};

export default DashboardField;
