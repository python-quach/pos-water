import { useEffect } from 'react';
import Portal from '../Portal/Portal';
import Header from '../Header/StoreHeader';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import { api } from '../../api/api';

export const AdminLoginScreen = ({ history }) => {
    const onSubmit = async ({ auth }) => {
        if (auth === '911') {
            api.getUsers((users) => {
                history.push({
                    pathname: '/admin/table',
                    state: { users, open: true },
                });
            });
        } else {
            return 'Unable to login';
        }
    };

    useEffect(() => {
        if (!history.location.state) {
            history.push('/');
        }
        return () => {
            console.log('AdminLoginScreen Cleanup');
        };
    }, [history]);

    return (
        <Portal
            open={history.location.state ? history.location.state.open : false}
            gridColumn={{ style: { width: 650 } }}>
            <Header title='Mckee Pure Water' content='Admin Login Screen' />
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
                                onClick={() => history.push('/')}
                            />
                        </Form.Group>
                    </Form>
                )}
            />
        </Portal>
    );
};

export default AdminLoginScreen;
