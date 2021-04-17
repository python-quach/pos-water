import { useEffect } from 'react';
import {
    TransitionablePortal,
    Segment,
    Grid,
    Transition,
    Form,
    Divider,
    Header,
    Icon,
} from 'semantic-ui-react';
import { useState, useContext } from 'react';
import { StoreContext } from '../store';
import { Form as FinalForm, Field } from 'react-final-form';

// Screen
export const LoginScreen = ({ close, segment, grid, children }) => {
    const { history } = useContext(StoreContext);

    return (
        <TransitionablePortal open={history ? true : false} {...close}>
            <Segment {...segment}>
                <Grid {...grid}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        {children}
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

LoginScreen.defaultProps = {
    close: {
        closeOnDocumentClick: false,
        closeOnEscape: false,
        closeOnDimmerClick: false,
        closeOnPortalMouseLeave: false,
    },
    segment: {
        style: {
            margin: 0,
            height: '100%',
            overflow: 'hidden',
            zIndex: 1000,
            backgroundColor: '#002b487d',
        },
    },
    grid: {
        textAlign: 'center',
        verticalAlign: 'middle',
        style: {
            height: '100vh',
        },
    },
    header: {
        title: 'Mckee Pure Water',
        content: 'Version 1.0',
    },
};

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

MckeeStoreHeader.defaultProps = {
    title: 'Mckee Pure Water',
    content: 'Login Screen: Version 1.0.0',
};

// FORM
export const LoginForm = ({ button, field }) => {
    const { setError, history, api, sleep } = useContext(StoreContext);

    const handleLogin = async (values) => {
        try {
            await sleep(500);
            history.push({
                pathname: '/dashboard',
                state: await api.login(values),
            });
        } catch (err) {
            setError(err);
            document.getElementById('username').focus();
            throw err;
        }
    };

    useEffect(() => {
        document.getElementById('username').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={handleLogin}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then()
                            .catch((err) => {
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
};

// FIELD
export const UsernameField = () => {
    const { setError } = useContext(StoreContext);

    return (
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
                    onChange={(_, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};
export const PasswordField = () => {
    const { setError } = useContext(StoreContext);

    return (
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
                    onChange={(_, { value }) => {
                        setError(false);
                        return input.onChange(value);
                    }}
                />
            )}
        />
    );
};

// BUTTONS
export const LoginButton = () => {
    const [visible, setVisible] = useState(true);
    const { error } = useContext(StoreContext);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                type='submit'
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
export const AdminButton = () => {
    const [visible, setVisible] = useState(true);
    const { history } = useContext(StoreContext);

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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(() => {
                        history.push({
                            pathname: '/admin/confirm',
                            state: true,
                        });
                    }, 500);
                }}
            />
        </Transition>
    );
};
export const CloseButton = () => {
    const [visible, setVisible] = useState(true);
    const { api } = useContext(StoreContext);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Close'
                type='button'
                color='black'
                size='huge'
                icon='close'
                labelPosition='right'
                circular
                fluid
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(api.closeApp, 500);
                }}
            />
        </Transition>
    );
};
export const BackupButton = () => {
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

export const LoginScreenField = {
    Username: UsernameField,
    Password: PasswordField,
};

export const LoginScreenButton = {
    Login: LoginButton,
    Admin: AdminButton,
    Close: CloseButton,
    Backup: BackupButton,
};
