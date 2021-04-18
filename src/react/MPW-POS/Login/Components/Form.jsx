import { useContext } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { StoreContext } from '../../store';

// FORM
export const LoginForm = ({ button, field }) => (
    <FinalForm
        onSubmit={useContext(StoreContext).login}
        render={({ handleSubmit, form }) => (
            <Form
                onSubmit={(event) => {
                    handleSubmit(event)
                        .then()
                        .catch((err) => {
                            console.log(err);
                            form.reset({});
                        });
                }}>
                {field.username}
                {field.password}
                <Divider hidden />
                {button.login}
                {button.admin}
                <Form.Group widths={2}>
                    {button.close}
                    {button.backup}
                </Form.Group>
            </Form>
        )}
    />
);

export default LoginForm;
