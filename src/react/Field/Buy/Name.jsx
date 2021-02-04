import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^/w]/g, '');
    return onlyWords.toUpperCase();
};

const Name = ({ edited }) => {
    return !edited ? (
        <Field
            name='fullname'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    className='Name'
                    label='Customer Name'
                    readOnly
                    inverted
                    width={4}
                />
            )}
        />
    ) : (
        <>
            <Field
                name='firstName'
                parse={normalizeName}
                render={({ input }) => (
                    <Form.Input
                        {...input}
                        id='firstName'
                        label='First Name'
                        className='Name'
                        error={edited}
                        inverted
                        width={3}
                    />
                )}
            />
            <Field
                name='lastName'
                parse={normalizeName}
                render={({ input }) => (
                    <Form.Input
                        {...input}
                        label='Last Name'
                        className='Name'
                        error={edited}
                        inverted
                        width={3}
                    />
                )}
            />
        </>
    );
};

export default Name;
