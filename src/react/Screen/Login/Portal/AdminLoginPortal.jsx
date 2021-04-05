import Portal from './index';
import Header from '../Header/LoginHeader';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';

export const AdminLoginPortal = ({ onSubmit, open, close }) => (
    <Portal open={open} gridColumn={{ style: { width: 650 } }}>
        <Header title='Mckee Pure Water' content='Admin Login' />
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form size='massive' onSubmit={handleSubmit}>
                    <Form.Group>
                        <Field
                            name='auth'
                            render={({ input }) => (
                                <Form.Input
                                    id='auth'
                                    type='password'
                                    focus
                                    placeholder='Admin Password'
                                    {...input}
                                />
                            )}
                        />
                        <Button
                            type='submit'
                            floated='right'
                            circular
                            content='Login'
                            size='massive'
                            primary
                        />
                        <Button
                            floated='right'
                            circular
                            size='massive'
                            secondary
                            type='button'
                            content='Cancel'
                            onClick={close}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    </Portal>
);

export default AdminLoginPortal;
