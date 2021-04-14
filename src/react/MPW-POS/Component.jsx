import { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import {
    Transition,
    Form,
    Header,
    Icon,
    TransitionablePortal,
    Segment,
    Grid,
} from 'semantic-ui-react';

// HELPERS
const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 9) return onlyNums;

    return onlyNums.slice(0, 9);
};

// Screen
export const LoginScreen = ({ open, segment, grid, header, form }) => (
    <TransitionablePortal open={open}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    {header}
                    {form}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);
LoginScreen.defaultProps = {
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

export const DashboardScreen = ({
    open,
    close,
    segment,
    grid,
    header,
    form,
}) => (
    <TransitionablePortal open={open} {...close}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    {header}
                    {form}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

DashboardScreen.defaultProps = {
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

export const BuyScreen = ({ segment, header, form }) => (
    <TransitionablePortal>
        <Segment {...segment}>
            <Grid>
                <Grid.Row>{header}</Grid.Row>
                <Grid.Row>{form}</Grid.Row>
            </Grid>
        </Segment>
    </TransitionablePortal>
);
BuyScreen.defaultProps = {
    segment: {
        style: {
            zIndex: 1000,
            margin: 0,
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#002b487d',
        },
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

// FORM
export const LoginForm = ({ onSubmit, field, button }) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{
                username: '',
                password: '',
            }}
            render={({ handleSubmit, form, initialValues, values }) => (
                <Form onSubmit={handleSubmit}>
                    {field.username}
                    {field.password}
                    {button.login}
                    {button.admin(values, form, initialValues)}
                    <Form.Group widths={2}>
                        {button.close}
                        {button.backup}
                    </Form.Group>
                </Form>
            )}
        />
    );
};
export const FindForm = ({ onSubmit, reset, error }) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form, values }) => (
                <Form onSubmit={handleSubmit}>
                    <PhoneField
                        reset={reset}
                        onFocus={() => {
                            form.change('account', '');
                            form.change('firstName', '');
                            form.change('lastName', '');
                        }}
                    />
                    <AccountField
                        reset={reset}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('firstName', '');
                                form.change('lastName', '');
                            });
                        }}
                    />
                    <FirstNameField
                        reset={reset}
                        error={error}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('account', '');
                            });
                        }}
                    />
                    <LastNameField
                        reset={reset}
                        error={error}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('account', '');
                            });
                        }}
                    />
                    <FindButton
                        error={error}
                        disabled={
                            (!values.phone &&
                                !values.account &&
                                !values.firstName &&
                                !values.lastName) ||
                            (values.phone && values.phone.length < 7)
                                ? true
                                : false
                        }
                    />
                    <AddButton />
                </Form>
            )}
        />
    );
};

// FIELD
export const UsernameField = ({ setError }) => (
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
export const PasswordField = ({ setError }) => (
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
);
export const PhoneField = ({ reset, onFocus }) => (
    <Field
        name='phone'
        parse={normalizePhone}
        render={({ input }) => (
            <Form.Input
                className='blueIcon'
                id='phone'
                placeholder='xxx-xxxx'
                focus
                type='text'
                size='massive'
                icon='whatsapp'
                fluid
                iconPosition='left'
                transparent
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const AccountField = ({ onFocus, reset }) => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                className='blueIcon'
                id='account'
                type='text'
                placeholder='account #'
                size='massive'
                focus
                fluid
                icon='credit card'
                iconPosition='left'
                transparent
                spellCheck='false'
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const NameField = ({ name, placeholder, onFocus, reset }) => (
    <Field
        name={name}
        render={({ input }) => (
            <Form.Input
                placeholder={placeholder}
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const FirstNameField = ({ onFocus, reset }) => (
    <Field
        name='firstName'
        render={({ input }) => (
            <Form.Input
                placeholder='first name'
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);
export const LastNameField = ({ onFocus, reset }) => (
    <Field
        name='lastName'
        render={({ input }) => (
            <Form.Input
                placeholder='last name'
                className='blueIcon'
                icon='user circle'
                iconPosition='left'
                size='massive'
                spellCheck='false'
                fluid
                focus
                transparent
                inverted
                value={input.value}
                name={input.name}
                onFocus={onFocus}
                onChange={(e, { value }) => {
                    reset();
                    return input.onChange(value);
                }}
            />
        )}
    />
);

// BUTTONS
export const LoginButton = ({ error }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content={!error ? 'Login' : error}
                type='submit'
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
export const AdminButton = ({ login }) => {
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
                onClick={() => {
                    setVisible((visible) => !visible);
                    login();
                }}
            />
        </Transition>
    );
};
export const CloseButton = ({ closeApp }) => {
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
export const FindButton = ({ error, disabled }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Find Membership'
                type='submit'
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='search'
                labelPosition='right'
                circular
                fluid
                disabled={disabled}
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};

export const AddButton = () => {
    const [visible, setVisible] = useState(true);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='AddButton'
                content='New Membership'
                type='button'
                size='huge'
                color='teal'
                icon='add circle'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const ReportButton = () => {};
export const LogoutButton = () => {};

export const Component = {
    Screen: {
        Dashboard: DashboardScreen,
    },
    Header: MckeeStoreHeader,
    Field: {
        Phone: PhoneField,
        Account: AccountField,
        Name: NameField,
    },
    Form: {
        Find: FindForm,
    },
    Button: {
        Find: FindButton,
        Add: AddButton,
    },
    Dashboard: {
        Screen: DashboardScreen,
        Header: '',
        Form: '',
        Field: '',
        Button: '',
    },
    LoginScreen: {
        Header: MckeeStoreHeader,
        Form: LoginForm,
        Field: {
            Username: UsernameField,
            Password: PasswordField,
        },
        Button: {
            Login: LoginButton,
            Admin: AdminButton,
            Close: CloseButton,
            Backup: BackupButton,
        },
        Screen: {
            Login: LoginScreen,
        },
    },
};

export default Component;
