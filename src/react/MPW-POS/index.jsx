import { useState, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import {
    Form,
    Grid,
    TransitionablePortal,
    Segment,
    Modal,
    Header,
    Icon,
    Button,
    Transition,
} from 'semantic-ui-react';
import api from './Api';

/**
 * DASHBOARD SCREEN
 * @param {*} param0
 * @returns
 */
export const DashboardScreen = ({ history }) => {
    useEffect(() => {
        if (!history.location.state) history.push('/');
    });

    return (
        <TransitionablePortal open={history ? true : false}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid.Column textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <pre>{JSON.stringify(history, 0, 2)}</pre>
                    </Grid.Column>
                </Grid.Column>
            </Segment>
        </TransitionablePortal>
    );
};
/**
 * LOGIN SCREEN
 * @returns
 */
export const LoginScreen = ({ history }) => {
    const handleLogin = async (values) => {
        try {
            const response = await api.login(values);
            history.push({ pathname: '/dashboard', state: response });
        } catch (err) {
            throw err;
        }
    };

    return (
        <TransitionablePortal open={history ? true : false}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <MckeeStoreHeader
                            title='Mckee Pure Water'
                            content='Version 1.0'
                        />
                        <LoginForm onSubmit={handleLogin} />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export const LoginForm = ({ onSubmit }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{
                username: '',
                password: '',
            }}
            render={({ handleSubmit, form, initialValues }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch((err) => {
                                setError(err);
                                form.reset(initialValues);
                                document.getElementById('username').focus();
                            });
                    }}>
                    <Field
                        name='username'
                        type='text'
                        render={({ input }) => (
                            <Form.Input
                                {...input}
                                id='username'
                                placeholder='username'
                                className='blueIcon'
                                size='massive'
                                icon='user circle'
                                iconPosition='left'
                                autoComplete='off'
                                spellCheck='false'
                                focus
                                inverted
                                transparent
                                fluid
                                onChange={(e, { value }) => {
                                    setError(false);
                                    return input.onChange(value);
                                }}
                            />
                        )}
                    />
                    <Field
                        name='password'
                        type='password'
                        render={({ input }) => (
                            <Form.Input
                                {...input}
                                id='password'
                                placeholder='password'
                                className='blueIcon'
                                size='massive'
                                icon='lock'
                                iconPosition='left'
                                autoComplete='off'
                                spellCheck='false'
                                focus
                                inverted
                                transparent
                                fluid
                                onChange={(e, { value }) => {
                                    setError(false);
                                    return input.onChange(value);
                                }}
                            />
                        )}
                    />
                    <Login error={error} />
                    <Admin />
                    <Form.Group widths={2}>
                        <Close closeApp={api.closeApp} />
                        <Backup />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export const AccountScreen = ({ history }) => {};
export const PurchaseScreen = ({ history }) => {};
// PORTALS
export const AdminLoginPortal = ({ history, open }) => {
    return (
        <TransitionablePortal onClose={() => history.push('/')} open={open}>
            <Segment
                style={{
                    margin: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Header>AdminLoginPortal</Header>
            </Segment>
        </TransitionablePortal>
    );
};

// MODALS
export const AdminModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <Modal open={open}>
            <Modal.Header>User Administration:</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header></Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Action>
                <Button onClick={() => setOpen(false)} secondary>
                    Close
                </Button>
            </Modal.Action>
        </Modal>
    );
};

// BUTTONS
export const Login = ({ error }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content={!error ? 'Login' : error}
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='sign-in'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const Admin = () => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Admin'
                type='button'
                color='yellow'
                size='huge'
                icon='database'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const Close = ({ closeApp }) => {
    return (
        <Transition visible={true} animation='pulse' duration='500'>
            <Form.Button
                content='Close'
                type='button'
                color='black'
                size='huge'
                icon='close'
                labelPosition='right'
                circular
                fluid
                onClick={closeApp}
            />
        </Transition>
    );
};

export const Backup = () => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Backup'
                type='button'
                size='huge'
                icon='file'
                labelPosition='right'
                circular
                color='pink'
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};

// FIELDS
export const Username = ({ setError }) => (
    <Field
        name='username'
        type='text'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='username'
                placeholder='username'
                className='blueIcon'
                size='massive'
                focus
                icon='user circle'
                iconPosition='left'
                autoComplete='off'
                spellCheck='false'
                inverted
                transparent
                fluid
                onChange={(e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const Password = ({ setError }) => (
    <Field
        name='password'
        type='password'
        render={({ input }) => (
            <Form.Input
                {...input}
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
                onChange={(e, { value }) => {
                    setError(false);
                    return input.onChange(value);
                }}
            />
        )}
    />
);

// HEADER
export const MckeeStoreHeader = ({ title, content }) => (
    <Header as='h1' inverted size='huge' textAlign='left'>
        <Icon name='braille' color='blue' />
        <Header.Content>
            {title}
            <Header.Subheader>{content}</Header.Subheader>
        </Header.Content>
    </Header>
);
