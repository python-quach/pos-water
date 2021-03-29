import { useEffect, useState } from 'react';
import {
    Segment,
    Header,
    Icon,
    TransitionablePortal,
    Grid,
    Form,
    Divider,
} from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { normalize } from '../Normalize';
import { findMembership, getDailyReport } from '../Api';

export const Phone = () => (
    <Field
        name='phone'
        parse={normalize.phone}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='phone'
                className='blueIcon'
                placeholder='xxx-xxx-xxxx'
                size='massive'
                icon='whatsapp'
                iconPosition='left'
                transparent
                focus
                fluid
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        parse={normalize.account}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='account'
                className='blueIcon'
                placeholder='account #'
                size='massive'
                icon='credit card'
                iconPosition='left'
                transparent
                fluid
                focus
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const FirstName = () => (
    <Field
        name='first'
        parse={normalize.name}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='firstName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                spellCheck='false'
                placeholder='first name'
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

export const LastName = () => (
    <Field
        name='last'
        parse={normalize.name}
        render={({ input: { name, value, onChange } }) => (
            <Form.Input
                id='lastName'
                className='blueIcon'
                size='massive'
                icon='user'
                iconPosition='left'
                transparent
                fluid
                focus
                spellCheck='false'
                placeholder='last name'
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    />
);

const FindButton = ({ values }) => (
    <Form.Button
        disabled={
            (!values.phone || values.phone.length < 14) &&
            !values.account &&
            !values.first &&
            !values.last
        }
        content='Find Membership'
        primary
        circular
        fluid
        icon='search'
        labelPosition='right'
        size='huge'
    />
);

const NewMemberButton = ({ add }) => (
    <Form.Button
        content='New Membership'
        color='teal'
        circular
        fluid
        icon='plus circle'
        labelPosition='right'
        size='huge'
        onClick={add}
    />
);

const DailyReportButton = ({ report }) => (
    <Form.Button
        content={`Daily Report ${new Date().toDateString()}`}
        type='button'
        color='yellow'
        circular
        icon='file'
        labelPosition='right'
        size='huge'
        fluid
        onClick={report}
    />
);

const LogoutButton = ({ logout }) => (
    <Form.Button
        content='Logout'
        color='black'
        size='huge'
        fluid
        circular
        icon='sign-out'
        labelPosition='right'
        type='button'
        onClick={logout}
    />
);

const DashBoardScreen = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, [open]);

    useEffect(() => {
        console.log({ props });
    }, [props]);

    const onSubmit = async (values) => {
        try {
            const data = await findMembership(values);
            console.log('RESPONSE FROM SERVER', data);
            data.history
                ? props.history.push({ pathname: '/buy', state: data })
                : props.history.push({ pathname: '/account', state: data });
        } catch (err) {
            console.log('ERROR CATCH: ', { err });
            const field_id = err.message;
            document.getElementById(field_id).focus();
        }
    };

    const logout = (e) => {
        e.preventDefault();
        props.history.push('/');
    };

    const add = (e) => {
        e.preventDefault();
        // props.history.push('/add');
        props.history.push({ pathname: '/add', state: { open: true } });
    };

    const report = (e) => {
        e.preventDefault();
        const date = new Date();
        console.log('Daily Report', date.toLocaleDateString());
        getDailyReport(
            date.toLocaleDateString(),
            date.toLocaleTimeString(),
            (data) => {
                console.log({ data });
            }
        );
    };

    return (
        <TransitionablePortal open={open}>
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
                    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Senter Pure Water
                                <Header.Subheader content='DashBoard' />
                            </Header.Content>
                        </Header>
                        <Divider />
                        <Divider hidden />
                        <FinalForm
                            onSubmit={onSubmit}
                            render={({ handleSubmit, form, values }) => (
                                <Form
                                    size='large'
                                    onSubmit={(event) => {
                                        handleSubmit(event).then(form.reset);
                                    }}>
                                    <Phone />
                                    <Account />
                                    <FirstName />
                                    <LastName />
                                    <Divider hidden />
                                    <FindButton values={values} />
                                    <NewMemberButton add={add} />
                                    <DailyReportButton report={report} />
                                    <LogoutButton logout={logout} />
                                </Form>
                            )}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default DashBoardScreen;
