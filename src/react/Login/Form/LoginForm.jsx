import { useContext, useState } from 'react';
import { Form, Divider, Button, Modal, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import Username from '../Field/LoginUsername';
import Password from '../Field/LoginPassword';
import LoginButton from '../Button/LoginButton';
import CloseButton from '../Button/CloseButton';
import BackButton from '../Button/BackupButton';
import { LoginContext } from '../Screen/LoginScreen';
import { api } from '../../../api/api';

const EditDeleteForm = (props) => {
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (values) => {
        console.log(values);
        const { admin } = values;
        if (admin !== '911') {
            setError(true);
        } else {
            api.editUser(values, (response) => {
                console.log('Edit User Response from Server', response);
                if (response) {
                    setError(false);
                }
            });
        }
    };
    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{
                user_id: props.user ? props.user.user_id : '',
                username: props.user ? props.user.username : '',
                password: props.user ? props.user.password : '',
            }}
            render={({ handleSubmit, form, values }) => {
                return (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event);
                        }}>
                        <Form.Group inline>
                            <Field
                                name='username'
                                render={({ input }) => (
                                    <Form.Input {...input} id='username' />
                                )}
                            />
                            <Field
                                type={showPassword ? 'input' : 'password'}
                                name='password'
                                render={({ input }) => (
                                    <Form.Input {...input} id='password' />
                                )}
                            />
                            <Field
                                name='admin'
                                type='password'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        error={error}
                                        onFocus={() => {
                                            console.log('focus');
                                            setError(false);
                                        }}
                                        id='admin'
                                        placeholder={
                                            error
                                                ? 'Wrong Password'
                                                : 'Enter Admin Password'
                                        }
                                    />
                                )}
                            />
                            <Form.Button
                                color={showPassword ? 'black' : 'green'}
                                content={showPassword ? 'Hide' : 'Show'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (values.admin === '911') {
                                        setShowPassword((prev) => !prev);
                                        setError(false);
                                    } else {
                                        setError(true);
                                    }
                                }}
                            />
                            <Form.Button primary content='Save' />
                            <Form.Button
                                negative
                                content='Delete'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (values.admin === '911') {
                                        api.deleteUser(
                                            {
                                                user_id: values.user_id,
                                                username: values.username,
                                                password: values.password,
                                            },
                                            (response) => {
                                                console.log(
                                                    'Delete User Response from Server:',
                                                    response
                                                );
                                                props.removeUser(
                                                    values.user_id
                                                );
                                                setError(false);
                                            }
                                        );
                                    } else {
                                        setError(true);
                                    }
                                }}
                            />
                        </Form.Group>
                    </Form>
                );
            }}
        />
    );
};

const AdminForm = (props) => {
    const [error, setError] = useState(false);

    return (
        <FinalForm
            onSubmit={props.onSubmit}
            initialValues={{
                user_id: props.user ? props.user.user_id : '',
                username: props.user ? props.user.username : '',
                password: props.user ? props.user.password : '',
            }}
            render={({ handleSubmit, form, values }) => {
                // props.setAdmin(values.admin);
                return (
                    <Form
                        onSubmit={(event) => {
                            if (values.admin !== '911') {
                                setError(true);
                            } else {
                                setError(false);
                                handleSubmit(event)
                                    .then(form.reset)
                                    .catch((err) => console.log(err));
                            }
                        }}>
                        <Form.Group inline>
                            <Field
                                name='username'
                                render={({ input }) => (
                                    <Form.Input
                                        id='username'
                                        label='Username'
                                        {...input}
                                    />
                                )}
                            />
                            <Field
                                name='password'
                                render={({ input }) => (
                                    <Form.Input
                                        id='password'
                                        label='Password'
                                        {...input}
                                    />
                                )}
                            />
                            <Field
                                name='admin'
                                type='password'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='admin'
                                        onFocus={() => {
                                            console.log('focus');
                                            setError(false);
                                        }}
                                        labelPosition='left'
                                        error={error ? true : false}
                                        placeholder={
                                            error
                                                ? 'Wrong Password'
                                                : 'Enter Admin Password'
                                        }
                                    />
                                )}
                            />
                            <Form.Button
                                content='Add'
                                primary
                                onClick={(e) => {
                                    // e.preventDefault();
                                    console.log('Add new user');
                                    // setOpenConfirmPortal(true);
                                }}
                            />
                            <Form.Button
                                negative
                                onClick={() => props.setOpen(false)}>
                                Close
                            </Form.Button>
                        </Form.Group>
                    </Form>
                );
            }}
        />
    );
};

const LoginForm = ({ size, history }) => {
    const { handle, initialValues } = useContext(LoginContext);
    const [users, setUsers] = useState(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [admin, setAdmin] = useState('');

    // Modify the local state here
    const addUser = (data) => {
        console.log('REACT ADD USER: ', data);
        setUsers((prevUsers) => {
            return [...prevUsers, data];
        });
    };

    const removeUser = (id) => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== id)
        );
    };

    const editUser = (data) => {
        console.log('EditUser:', data);
        setUsers((prevUsers) =>
            prevUsers.map((user, index) => {
                if (user.user_id === data.user_id) {
                    return data;
                }
                return user;
            })
        );
    };

    const handleAddNewUser = async (values) => {
        console.log('Add User:', values);
        const { admin } = values;
        if (admin !== '911') {
            // setError('Please enter admin password');
            setError(true);
        } else {
            api.addUser(values, (response) => {
                console.log('Add New User Response from Server:', response);
                addUser(response);
                setError(false);
            });
        }
    };

    const handleEditUser = async (values) => {
        const { admin } = values;
        if (admin !== '911') {
            setError('Please enter admin password');
            setAdmin('');
        } else {
            api.editUser(values, (response) => {
                console.log('Edit User Response from Server', response);
                if (response) {
                    editUser(values);
                    setError(false);
                    setAdmin('');
                }
            });
        }
    };

    return (
        <FinalForm
            onSubmit={handle.login}
            initialValues={initialValues}
            render={({
                handleSubmit,
                form,
                values: { username, password },
            }) => (
                <Form
                    size={size}
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Username />
                    <Password />
                    <Divider hidden />
                    <LoginButton username={username} password={password} />
                    <Modal dimmer='blurring' open={open}>
                        <Modal.Content>
                            <Header>Edit Users</Header>
                            {users &&
                                users.map((user, index) => (
                                    <EditDeleteForm
                                        admin={admin}
                                        onSubmit={handleEditUser}
                                        user={user}
                                        index={index}
                                        key={index}
                                        addUser={addUser}
                                        setAdmin={setAdmin}
                                        removeUser={removeUser}
                                        editUser={editUser}
                                    />
                                ))}
                        </Modal.Content>
                        <Modal.Actions>
                            <AdminForm
                                setOpen={setOpen}
                                admin={admin}
                                setAdmin={setAdmin}
                                onSubmit={handleAddNewUser}
                                addUser={addUser}></AdminForm>
                        </Modal.Actions>
                    </Modal>

                    <Button
                        content='Admin'
                        size='huge'
                        icon='database'
                        labelPosition='right'
                        circular
                        color='yellow'
                        fluid
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('go to admin page');
                            setOpen(true);
                            api.getUsers((users) => {
                                console.log(users);
                                setUsers(users);
                            });
                        }}
                    />
                    <Divider hidden />
                    <Form.Group>
                        <CloseButton />
                        <BackButton />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
