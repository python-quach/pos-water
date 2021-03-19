import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const Username = (props) => (
    <Field
        name='username'
        render={({ input }) => (
            <Form.Input
                id='username'
                className='blueIcon'
                size='massive'
                icon='user'
                transparent
                iconPosition='left'
                fluid
                focus
                placeholder='username'
                name={input.name}
                value={input.value}
                onChange={(e) => {
                    props.setError(false);
                    return input.onChange(e.target.value);
                }}
            />
        )}
    />
);

export const Password = (props) => (
    <Field
        name='password'
        render={({ input }) => (
            <Form.Input
                type='password'
                id='password'
                className='blueIcon'
                icon='user'
                transparent
                iconPosition='left'
                fluid
                focus
                size='massive'
                name={input.name}
                value={input.value}
                placeholder='password'
                onChange={(e) => {
                    props.setError(false);
                    return input.onChange(e.target.value);
                }}
            />
        )}
    />
);
