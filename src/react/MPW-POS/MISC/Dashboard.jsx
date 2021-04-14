import { useEffect, useState } from 'react';
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
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
export const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 9) return onlyNums;
    return onlyNums.slice(0, 9);
};

// SCREEN
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
export const FindForm = ({ onSubmit, reset, error, goTo }) => {
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
                    <AddButton
                        onClick={(setVisible) => {
                            setVisible((prev) => !prev);
                            setTimeout(() => {
                                goTo.AddScreen();
                            }, 500);
                        }}
                    />
                    <ReportButton onClick={() => goTo.ReportScreen()} />
                    <LogoutButton />
                </Form>
            )}
        />
    );
};

// FIELD
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

// BUTTON
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
export const AddButton = ({ onClick }) => {
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
                onClick={() => onClick(setVisible)}
            />
        </Transition>
    );
};
export const ReportButton = () => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='ReportButton'
                type='button'
                color='yellow'
                size='huge'
                icon='calendar'
                labelPosition='right'
                content={`Daily Report: ${new Date().toLocaleDateString()}`}
                circular
                fluid
                onClick={() => {
                    setVisible((prev) => !prev);
                }}
            />
        </Transition>
    );
};
export const LogoutButton = () => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='LogoutButton'
                content='Logout'
                size='huge'
                color='black'
                icon='sign-out'
                labelPosition='right'
                circular
                fluid
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};

// DASHBOARD
export const Dashboard = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleFindMembership = async (values) => {
        console.log(values);
    };

    const showDashboardScreen = () => {
        history.push('/');
    };
    const showBuyScreen = () => {
        history.push({ pathname: '/buy' });
    };
    const showAddScreen = () => {
        history.push({ pathname: '/add' });
    };
    const showDailyScreen = () => {
        history.push({ pathname: '/report' });
    };

    useEffect(() => {
        if (!history.location.state) showDashboardScreen();
        return () => {
            console.log('Dashboard unmount cleanup');
        };
    });

    // JSX ELEMENT
    return (
        <DashboardScreen
            open={history.location.state ? true : false}
            header={
                <MckeeStoreHeader
                    title='Mckee Pure Water'
                    content='Dashboard Version 1.0.0'
                />
            }
            form={
                <FindForm
                    onSubmit={handleFindMembership}
                    reset={setErrorMessage}
                    error={errorMessage}
                    goTo={{
                        AddScreen: showAddScreen,
                        BuyScreen: showBuyScreen,
                        ReportScreen: showDailyScreen,
                    }}
                />
            }
        />
    );
};

export default Dashboard;
