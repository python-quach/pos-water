import { Form, Divider, Transition, Message } from 'semantic-ui-react';
import { Field } from '../Field';

const LoginForm = (props) => {
    const {
        iconColor,
        errorMessage,
        values: { username, password },
        handleSubmit,
        form,
    } = props;
    return (
        <>
            <Form
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                <Field.Username iconColor={iconColor} />
                <Field.Password iconColor={iconColor} />
                <Divider hidden />
                {!errorMessage ? (
                    <Form.Button
                        content='Login'
                        className='LoginButton'
                        primary
                        circular
                        fluid
                        size='huge'
                        id='LoginButton'
                        color='blue'
                        icon='sign in'
                        labelPosition='right'
                        type='submit'
                        disabled={!username || !password}
                        onClick={() => {
                            document.getElementById('username').focus();
                        }}
                    />
                ) : (
                    <Transition
                        animation='shake'
                        duration={500}
                        unmountOnHide={true}>
                        <Form.Button
                            content='Invalid Login'
                            circular
                            fluid
                            size='huge'
                            id='LoginButton'
                            color='red'
                            icon='warning sign'
                            labelPosition='right'
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        />
                    </Transition>
                )}
            </Form>
            <Divider hidden />
            <Message>
                <Message.Content>
                    {JSON.stringify({ username, password }, 0, 2)}
                </Message.Content>
            </Message>
        </>
    );
};

export default LoginForm;
