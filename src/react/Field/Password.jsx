import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Password = (props) => {
    const { iconColor } = props;
    return (
        <Field
            id='password'
            name='password'
            placeholder='password'
            component={Form.Input}
            className={iconColor}
            type='password'
            size='massive'
            icon='lock'
            iconPosition='left'
            focus
            fluid
            transparent
            inverted
        />
    );
};

export default Password;
