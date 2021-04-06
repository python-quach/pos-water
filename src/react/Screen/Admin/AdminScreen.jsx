import { useEffect, useState } from 'react';
import Portal from '../../Portal/Portal';
import Header from '../../Header/StoreHeader';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Transition } from 'semantic-ui-react';
import { api } from '../../../api/api';

export const AdminLoginScreen = ({ history }) => {
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState('');

    const onSubmit = async ({ auth }) => {
        console.log('onSubmit', auth);
        setVisible(false);
        setVisible(true);
        if (auth === '911') {
            api.getUsers((users) => {
                history.push({
                    pathname: '/admin/table',
                    state: { users, open: true },
                });
            });
        } else {
            setError('Invalid Password');
            document.getElementById('auth').focus();
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
                render={({ handleSubmit, form }) => (
                    <Form
                        onSubmit={(event) =>
                            handleSubmit(event).then(form.reset)
                        }>
                        <Form.Group widths={3}>
                            <Field
                                name='auth'
                                render={({ input }) => (
                                    <Form.Input
                                        id='auth'
                                        error={error ? true : false}
                                        type='password'
                                        placeholder='password'
                                        icon='lock'
                                        iconPosition='left'
                                        width={10}
                                        size='massive'
                                        name={input.name}
                                        value={input.value}
                                        onChange={(e, { value }) => {
                                            setError(false);
                                            return input.onChange(value);
                                        }}
                                    />
                                )}
                            />
                            <Transition visible={visible} animation='pulse'>
                                <Form.Button
                                    content='Login'
                                    size='massive'
                                    type='submit'
                                    fluid
                                    primary
                                    onClick={() => {
                                        setVisible(false);
                                    }}
                                />
                            </Transition>
                            <Form.Button
                                content='Cancel'
                                size='massive'
                                type='button'
                                secondary
                                fluid
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
