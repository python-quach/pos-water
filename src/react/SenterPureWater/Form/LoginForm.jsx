import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { Username, Password } from '../Field/LoginField';

const LoginForm = ({ onSubmit, setError, children }) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                <Username setError={setError} />
                <Password setError={setError} />
                {children}
            </Form>
        )}
    />
);

export default LoginForm;
