import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Username = (props) => {
    const { iconColor } = props;
    return (
        <>
            <Field
                id='username'
                name='username'
                placeholder='username'
                component={Form.Input}
                className={iconColor}
                type='text'
                size='massive'
                icon='user circle'
                iconPosition='left'
                focus
                fluid
                transparent
                inverted
            />
        </>
    );
};

export default Username;
