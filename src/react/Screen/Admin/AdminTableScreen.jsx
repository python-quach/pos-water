import { useState, useEffect } from 'react';
import Portal from '../../Portal/Portal';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Modal } from 'semantic-ui-react';
import { AdminTable } from './AdminTable';

import { mckeeApi } from '../../../api/api';

export const AdminTableScreen = ({ history }) => {
    const { state } = history.location;

    const [users, setUsers] = useState(state ? state.users : []);
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const edit = async (user_id, values) => {
        try {
            await mckeeApi.editUser(values);
            setUsers(() =>
                users.map((user) => {
                    if (user.user_id === user_id) return values;
                    else return user;
                })
            );
        } catch (err) {
            return console.log(err);
        }
    };

    const add = async (values) => {
        try {
            const newUser = await mckeeApi.addUser(values);
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (err) {
            return console.log(err);
        }
    };

    const remove = async (user_id) => {
        try {
            await mckeeApi.deleteUser(user_id);
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.user_id !== user_id)
            );
        } catch (err) {
            return console.log(err);
        }
    };

    const onSubmit = async (values) => {
        const { user_id } = values;
        setOpenModal(false);
        setUser({});
        user_id ? edit(user_id, values) : add(values);
    };

    useEffect(() => {
        if (!history.location.state) history.push('/admin');
    });

    return (
        <Portal
            style={{ overflow: 'scroll' }}
            open={state ? state.open : false}
            gridColumn={{ style: { width: 575 } }}>
            <AdminTable
                users={users}
                edit={(user_id, username, password) => {
                    setUser({ user_id, username, password });
                    setOpenModal(true);
                }}
                remove={(user_id) => remove(user_id)}
                add={() => setOpenModal(true)}
                done={() => history.push('/')}
            />
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
                                        primary
                                    />
                                    <Form.Button
                                        type='button'
                                        content='Cancel'
                                        size='massive'
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

export default AdminTableScreen;
