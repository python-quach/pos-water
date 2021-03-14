import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { Username, Password } from '../Field/LoginField';

const LoginForm = (props) => (
    <FinalForm
        onSubmit={props.onSubmit}
        render={({ handleSubmit, form, dirty, pristine }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                <Username setError={props.setError} />
                <Password setError={props.setError} />
                <Divider hidden />
                <Form.Button
                    circular
                    fluid
                    icon={props.error ? 'warning' : 'lock'}
                    labelPosition='right'
                    primary
                    size='huge'
                    negative={props.error}
                    content={props.error ? 'Invalid Credential' : 'Login'}
                />
                <Form.Button
                    circular
                    content='Admin'
                    size='huge'
                    color='yellow'
                    icon='user circle'
                    labelPosition='right'
                    fluid
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Admin Button');
                    }}
                />
                <Form.Group widths={2}>
                    <Form.Button
                        circular
                        fluid
                        size='huge'
                        content='Close'
                        icon='close'
                        labelPosition='right'
                        color='black'
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Close');
                        }}
                    />
                    <Form.Button
                        circular
                        size='huge'
                        content='Backup'
                        icon='database'
                        labelPosition='right'
                        color='pink'
                        fluid
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Backup');
                        }}
                    />
                </Form.Group>
                {/* <FormSpy
                    subscription={{
                        dirtyFields: true,
                        dirty: true,
                        pristine: true,
                    }}>
                    {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                </FormSpy> */}
            </Form>
        )}
    />
);

export default LoginForm;
