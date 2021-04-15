import { useState, useEffect } from 'react';

import Screen from './Screen';
import Header from './Header';
import { Modal, Button, Form, Icon, Table } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { add, mckeeApi } from '../../../api/api';

export const Admin = ({ history }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState('');

    const updateUserList = (values) => {
        setData((users) => {
            users.map((user) => {
                return user.user_id === values.user_id ? values : user;
            });
        });
        setUser({});
        setAction('');
        setOpenModal(false);
    };

    const addNewUserToList = (values) => {
        setData((prev) => [...prev, values]);
        setAction('');
        setOpenModal(false);
    };

    const removeUserFromList = (values) => {
        setData((prev) =>
            prev.filter((user) => user.user_id !== values.user_id)
        );
        setAction('');
    };

    const onSubmit = async ({ username, password }) => {
        if (username && password) {
            try {
                addNewUserToList(
                    await mckeeApi.addUser({ username, password })
                );
            } catch (err) {
                return console.log(err.message);
            }
        }

        return { username, password };
    };

    useEffect(() => {
        if (!history.location.state) history.push('/');
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await mckeeApi.getUsers();
            console.log('fetchData', result);
            setData(result);
        };

        if (history.location.state) fetchData();
    }, [history]);

    return (
        <Screen open={history.location.state ? true : false} size={866}>
            <Header />
            <Table celled compact definition basic inverted size='large'>
                <Table.Header fullWidth>
                    <Table.Row style={{ fontSize: '22px' }}>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell width={5} textAlign='right'>
                            Action
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map(({ username, password, user_id }, key) => {
                        return (
                            <Table.Row
                                key={key}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{password}</Table.Cell>
                                <Table.Cell>
                                    <Form.Button
                                        content='Delete'
                                        floated='right'
                                        negative
                                        size='huge'
                                        onClick={async () => {
                                            console.log('delete');
                                            setAction('delete');
                                            await mckeeApi.deleteUser(user_id);
                                            setData((prev) =>
                                                prev.filter(
                                                    (user) =>
                                                        user.user_id !== user_id
                                                )
                                            );
                                            setAction('');
                                        }}
                                    />
                                    <Button
                                        size='huge'
                                        content='Edit'
                                        floated='right'
                                        primary
                                        onClick={() => {
                                            setUser({
                                                user_id,
                                                username,
                                                password,
                                            });
                                            setAction('edit');
                                            setOpenModal(true);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Form.Group>
                                <Form.Button
                                    type='button'
                                    icon
                                    content='Done'
                                    floated='right'
                                    secondary
                                    size='huge'
                                    onClick={() => history.push('/')}
                                />
                                <Form.Button
                                    floated='right'
                                    icon
                                    type='button'
                                    labelPosition='left'
                                    primary
                                    size='huge'
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
                closeOnDimmerClick={false}
                closeOnDocumentClick={false}
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
                                        onClick={() => {
                                            setAction('add');
                                        }}
                                    />
                                    <Form.Button
                                        content='Cancel'
                                        type='button'
                                        size='massive'
                                        circular
                                        secondary
                                        onClick={() => {
                                            setUser({});
                                            setOpenModal(false);
                                        }}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    />
                </Modal.Content>
            </Modal>
        </Screen>
    );
};
export default Admin;
