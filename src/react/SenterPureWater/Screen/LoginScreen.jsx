import { useState } from 'react';
import {
    Segment,
    TransitionablePortal,
    Grid,
    Form,
    Divider,
} from 'semantic-ui-react';
import LoginHeader from './LoginHeader';
import { backup, closeApp, login } from '../Api';
import { Field, Form as FinalForm } from 'react-final-form';

function LoginScreen(props) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState(null);
    const { segment, grid, column, portalSetting } = props;

    const goToDashBoardScreen = (user) => {
        props.history.push({
            pathname: '/dashboard',
            state: { user },
        });
    };

    const handleUserLogin = async (values) => {
        try {
            const user = await login(values);
            goToDashBoardScreen(user);
        } catch (err) {
            setError(err.message);
            document.getElementById('username').focus();
        }
    };

    const handleBackup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await backup();
            setFileSave(result.open);
            setLoading(false);
        } catch (err) {
            return console.log(err.message);
        }
    };

    const clearError = (e, input) => {
        e.preventDefault();
        setError(false);
        return input.onChange(e.target.value);
    };

    return (
        <TransitionablePortal {...portalSetting} open={true}>
            <Segment {...segment}>
                <Grid {...grid}>
                    <Grid.Column {...column}>
                        <LoginHeader version='Version: 2.0.4' />
                        <Divider />
                        <FinalForm
                            onSubmit={handleUserLogin}
                            render={({ handleSubmit, form }) => (
                                <Form
                                    size='large'
                                    onSubmit={(event) => {
                                        handleSubmit(event).then(form.reset);
                                    }}>
                                    <Field
                                        name='username'
                                        render={({ input }) => (
                                            <Form.Input
                                                id='username'
                                                className='blueIcon'
                                                size='massive'
                                                icon='user'
                                                transparent
                                                iconPosition='left'
                                                fluid
                                                focus
                                                placeholder='username'
                                                name={input.name}
                                                value={input.value}
                                                onChange={(e) =>
                                                    clearError(e, input)
                                                }
                                            />
                                        )}
                                    />
                                    <Field
                                        name='password'
                                        render={({ input }) => (
                                            <Form.Input
                                                type='password'
                                                id='password'
                                                className='blueIcon'
                                                icon='user'
                                                transparent
                                                iconPosition='left'
                                                fluid
                                                focus
                                                size='massive'
                                                name={input.name}
                                                value={input.value}
                                                placeholder='password'
                                                onChange={(e) =>
                                                    clearError(e, input)
                                                }
                                            />
                                        )}
                                    />
                                    <Divider hidden />
                                    <Form.Button
                                        content={
                                            error
                                                ? 'Invalid Credential'
                                                : 'Login'
                                        }
                                        icon={error ? 'warning' : 'lock'}
                                        negative={error ? true : false}
                                        labelPosition='right'
                                        size='huge'
                                        circular
                                        fluid
                                        primary
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
                                            onClick={closeApp}
                                        />
                                        <Form.Button
                                            loading={loading}
                                            circular
                                            size='huge'
                                            content={
                                                fileSave ? fileSave : 'Backup'
                                            }
                                            icon='database'
                                            color='pink'
                                            fluid
                                            onClick={handleBackup}
                                        />
                                    </Form.Group>
                                </Form>
                            )}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
}

LoginScreen.defaultProps = {
    segment: {
        raised: true,
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
    column: {
        style: { maxWidth: 450 },
    },
    header: {
        as: 'h1',
        inverted: true,
        size: 'huge',
        textAlign: 'left',
    },
    icon: {
        name: 'braille',
        color: 'blue',
    },
    portalSetting: {
        closeOnDocumentClick: false,
        closeOnEscape: false,
        closeOnDimmerClick: false,
        closeOnPortalMouseLeave: false,
    },
    content: 'Senter Pure Water',
    version: 'Dashboard Version 1.0',
};

export default LoginScreen;
