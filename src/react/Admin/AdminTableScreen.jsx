import { useState } from 'react';
import Portal from '../Portal/Portal';
import { Form as FinalForm, Field } from 'react-final-form';
import { Table, Button, Form, Icon, Modal } from 'semantic-ui-react';

import { channels } from '../../shared/constants';
const { ipcRenderer } = window;

export const editUser = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.EDIT_USER, data);
        ipcRenderer.on(channels.EDIT_USER, (_, arg) => {
            ipcRenderer.removeAllListeners(channels.EDIT_USER);
            if (!arg) reject('Unable to Edit Users');
            resolve(arg);
        });
    });
};

export const addUser = (data) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(channels.ADD_USER, data);
        ipcRenderer.on(channels.ADD_USER, (_, arg) => {
            ipcRenderer.removeAllListeners(channels.ADD_USER);
            console.log('addUser Response from Server');
            if (!arg) reject('Unable to add use');
            resolve(arg);
        });
    });
};

export const AdminUserTablePortal = ({ history }) => {
    const [users, setUsers] = useState(history.location.state.users);
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = async (values) => {
        const { user_id } = values;
        try {
            if (user_id) {
                const response = await editUser(values);
                if (response) {
                    setUsers((prevUsers) => {
                        setOpenModal(false);
                        setUser({});
                        return users.map((user) => {
                            if (user.user_id === user_id) {
                                return values;
                            } else {
                                return user;
                            }
                        });
                    });
                }
            } else {
                const newUser = await addUser(values);
                setUsers((prevUsers) => {
                    setOpenModal(false);
                    setUser({});
                    return [...prevUsers, newUser];
                });
            }
        } catch (err) {
            return console.log(err.message);
        }
        return values;
    };

    return (
        <Portal
            open={history.location.state.open}
            gridColumn={{ style: { width: 575 } }}>
            <Table celled compact definition basic inverted size='large'>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(({ username, password, user_id }, key) => {
                        return (
                            <Table.Row key={key}>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{password}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        size='large'
                                        content='Edit'
                                        primary
                                        onClick={() => {
                                            setOpenModal(() => {
                                                setUser({
                                                    user_id,
                                                    username,
                                                    password,
                                                });
                                                return true;
                                            });
                                        }}
                                    />
                                    <Button
                                        content='Delete'
                                        negative
                                        size='large'
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Form.Group>
                                <Form.Button
                                    type='button'
                                    icon
                                    content='Done'
                                    floated='right'
                                    secondary
                                    size='large'
                                    onClick={() => history.push('/')}
                                />
                                <Form.Button
                                    floated='right'
                                    icon
                                    type='button'
                                    labelPosition='left'
                                    primary
                                    size='large'
                                    onClick={() => setOpenModal(true)}>
                                    <Icon name='user' /> Add User
                                </Form.Button>
                            </Form.Group>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <Modal
                open={openModal}
                dimmer='blurring'
                size='fullscreen'
                basic
                centered>
                <Modal.Content>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={{ ...user }}
                        render={({ handleSubmit }) => (
                            <Form size='massive' onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Input type='hidden' width={4} />
                                    <Field
                                        name='username'
                                        render={({ input }) => (
                                            <Form.Input
                                                {...input}
                                                placeholder='username'
                                            />
                                        )}
                                    />
                                    <Field
                                        name='password'
                                        render={({ input }) => (
                                            <Form.Input
                                                {...input}
                                                placeholder='password'
                                            />
                                        )}
                                    />
                                    <Form.Button
                                        content={!user.user_id ? 'Add' : 'Save'}
                                        type='submit'
                                        size='massive'
                                        circular
                                        primary
                                    />
                                    <Form.Button
                                        content='Cancel'
                                        type='button'
                                        size='massive'
                                        circular
                                        secondary
                                        onClick={() => setOpenModal(false)}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    />
                </Modal.Content>
            </Modal>
        </Portal>
    );
};

export default AdminUserTablePortal;
