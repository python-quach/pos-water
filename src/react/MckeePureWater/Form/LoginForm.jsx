import { useState, useEffect } from 'react';
import { channels } from '../../../shared/constants';
import { withRouter } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import PulseButton from '../Button/PulseButton';

const { ipcRenderer } = window;

const LoginForm = ({ history }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    const onSubmit = async (values, form) => {
        console.log('onSubmit: ', values);
        ipcRenderer.send(channels.LOGIN, values);
        ipcRenderer.on(channels.LOGIN, (_, { error, data }) => {
            ipcRenderer.removeAllListeners(channels.LOGIN);
            if (error) {
                setTimeout(form.reset);
                setError(error);
            } else {
                console.log('Response from server: ', { data });
                history.push({ pathname: '/dashboard', state: { data } });
            }
        });
    };

    return (
        <FinalForm
            subscription={{ values: true }}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field
                        name='username'
                        render={({ input }) => (
                            <Form.Input
                                id='username'
                                placeholder='username'
                                className='blueIcon'
                                size='massive'
                                icon='user circle'
                                iconPosition='left'
                                autoComplete='off'
                                spellCheck='false'
                                inverted
                                transparent
                                fluid
                                focus
                                name={input.name}
                                value={input.value}
                                onChange={(value) => {
                                    setError(false);
                                    input.onChange(value);
                                }}
                            />
                        )}
                    />
                    <Field
                        name='password'
                        render={({ input }) => (
                            <Form.Input
                                id='password'
                                placeholder='password'
                                className='blueIcon'
                                size='massive'
                                icon='lock'
                                iconPosition='left'
                                autoComplete='off'
                                spellCheck='false'
                                inverted
                                transparent
                                fluid
                                focus
                                name={input.name}
                                value={input.value}
                                onChange={(value) => {
                                    setError(false);
                                    input.onChange(value);
                                }}
                            />
                        )}
                    />
                    <Divider hidden />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Login'
                                size='huge'
                                circular
                                fluid
                                color={error ? 'red' : 'blue'}
                                onClick={() => {
                                    setVisible((visible) => !visible);
                                    document.getElementById('username').focus();
                                }}
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Admin'
                                size='huge'
                                type='button'
                                circular
                                fluid
                                color='yellow'
                                onClick={() =>
                                    setVisible((visible) => !visible)
                                }
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Backup'
                                size='huge'
                                type='button'
                                circular
                                fluid
                                color='pink'
                                onClick={() =>
                                    setVisible((visible) => !visible)
                                }
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Close'
                                size='huge'
                                type='button'
                                circular
                                fluid
                                color='black'
                                onClick={() => {
                                    setVisible((visible) => !visible);
                                    ipcRenderer.send(channels.CLOSE_APP);
                                }}
                            />
                        )}
                    />
                </Form>
            )}
        />
    );
};

export default withRouter(LoginForm);
