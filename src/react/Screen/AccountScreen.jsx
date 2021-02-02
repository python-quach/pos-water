import React from 'react';
import { Form } from 'semantic-ui-react';
import FormDebug from '../Debug/FormDebug';

const AccountScreen = (props) => {
    console.log(props);
    return (
        <>
            <FormDebug data={props} />
            <Form.Button
                content='Back'
                onClick={() => props.history.push('/')}
            />
        </>
    );
};
export default AccountScreen;
