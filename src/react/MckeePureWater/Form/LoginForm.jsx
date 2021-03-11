import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Form, Segment } from 'semantic-ui-react';
import { Username, Password } from '../Field/LoginField';

const LoginForm = (props) => (
    <Segment clearing raised>
        <FinalForm
            onSubmit={props.onSubmit}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Username />
                    <Password />
                    <Form.Button fluid primary content='Login' />
                    {/* <FormSpy>
                    {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                </FormSpy> */}
                </Form>
            )}
        />
    </Segment>
);

export default LoginForm;
