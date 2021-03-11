import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { Username, Password } from '../Field/LoginField';

const LoginForm = (props) => (
    <FinalForm
        onSubmit={props.onSubmit}
        render={({ handleSubmit }) => (
            <Form
                onSubmit={(event) => {
                    handleSubmit(event);
                }}>
                <Username />
                <Password />
                <Form.Button primary content='Login' />
                {/* <FormSpy>
                    {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                </FormSpy> */}
            </Form>
        )}
    />
);

export default LoginForm;
