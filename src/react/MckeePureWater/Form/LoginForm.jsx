import { useState, useEffect } from 'react';
import { channels } from '../../../shared/constants';
import { withRouter } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import PulseButton from '../Button/PulseButton';

const { ipcRenderer } = window;

const LoginButton = ({ error }) => (
    <PulseButton
        render={(setVisible) => (
            <Form.Button
                content='Login'
                size='huge'
                color={error ? 'red' : 'blue'}
                icon='sign-in'
                labelPosition='right'
                circular
                fluid
                onClick={() => {
                    setVisible((visible) => !visible);
                    document.getElementById('username').focus();
                }}
            />
        )}
    />
);
const AdminButton = () => (
    <PulseButton
        render={(setVisible) => (
            <Form.Button
                content='Admin'
                size='huge'
                type='button'
                color='yellow'
                icon='database'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((visible) => !visible)}
            />
        )}
    />
);
const CloseButton = () => (
    <PulseButton
        render={(setVisible) => (
            <Form.Button
                content='Close'
                size='huge'
                type='button'
                color='black'
                icon='close'
                labelPosition='right'
                circular
                fluid
                onClick={() => {
                    setVisible((visible) => !visible);
                    setTimeout(() => {
                        ipcRenderer.send(channels.CLOSE_APP);
                    }, 500);
                }}
            />
        )}
    />
);
const BackupButton = () => (
    <PulseButton
        render={(setVisible) => (
            <Form.Button
                content='Backup'
                size='huge'
                type='button'
                color='pink'
                icon='save'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((visible) => !visible)}
            />
        )}
    />
);
const UsernameField = ({ setError }) => (
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
);
const PasswordField = ({ setError }) => (
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
);

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
                console.log('Response from server: ', data);
                history.push({ pathname: '/dashboard', state: data });
            }
        });
    };

    return (
        <FinalForm
            subscription={{ values: true }}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <UsernameField setError={setError} />
                    <PasswordField setError={setError} />
                    <Divider hidden />
                    <LoginButton error={error} />
                    <AdminButton />
                    <Form.Group widths={2}>
                        <CloseButton />
                        <BackupButton />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default withRouter(LoginForm);
