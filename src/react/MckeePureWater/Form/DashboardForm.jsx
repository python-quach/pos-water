import { useState, useEffect } from 'react';
import { channels } from '../../../shared/constants';
import { withRouter } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import PulseButton from '../Button/PulseButton';

const { ipcRenderer } = window;

const DashboardForm = ({ history }) => {
    const [error, setError] = useState(false);

    useEffect(() => {});

    const onSubmit = async (values, form) => {
        console.log('onSubmit: ', values);
        ipcRenderer.send(channels.FIND, values);
        ipcRenderer.on(channels.FIND, (_, { error, data }) => {
            ipcRenderer.removeAllListeners(channels.FIND);
            if (error) {
                setTimeout(form.reset);
                setError(error);
            } else {
                console.log('Response from server: ', data);
            }
        });
    };

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field
                        name='phone'
                        render={({ input }) => (
                            <Form.Input
                                id='phone'
                                placeholder='phone'
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
                        name='account'
                        render={({ input }) => (
                            <Form.Input
                                id='account'
                                placeholder='account'
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
                        name='firstName'
                        render={({ input }) => (
                            <Form.Input
                                id='firstName'
                                placeholder='firstName'
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
                        name='lastName'
                        render={({ input }) => (
                            <Form.Input
                                id='lastName'
                                placeholder='lastName'
                                name={input.name}
                                value={input.value}
                                onChange={(value) => {
                                    setError(false);
                                    input.onChange(value);
                                }}
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Find Membership'
                                size='huge'
                                icon='search'
                                labelPosition='right'
                                circular
                                fluid
                                color={error ? 'red' : 'blue'}
                                onClick={() => {
                                    setVisible((visible) => !visible);
                                    document.getElementById('phone').focus();
                                }}
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='New Membership'
                                type='button'
                                size='huge'
                                icon='add circle'
                                labelPosition='right'
                                circular
                                fluid
                                color='teal'
                                onClick={() =>
                                    setVisible((visible) => !visible)
                                }
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content={`Daily Report: ${new Date().toLocaleDateString()}`}
                                type='button'
                                size='huge'
                                color='yellow'
                                icon='calendar'
                                labelPosition='right'
                                circular
                                fluid
                                onClick={() =>
                                    setVisible((visible) => !visible)
                                }
                            />
                        )}
                    />
                    <PulseButton
                        render={(setVisible) => (
                            <Form.Button
                                content='Logout'
                                type='button'
                                size='huge'
                                color='black'
                                icon='sign-out'
                                labelPosition='right'
                                circular
                                fluid
                                onClick={() => {
                                    setVisible((visible) => !visible);
                                    setTimeout(() => {
                                        history.push('/');
                                    }, 500);
                                }}
                            />
                        )}
                    />
                </Form>
            )}
        />
    );
};

export default withRouter(DashboardForm);
