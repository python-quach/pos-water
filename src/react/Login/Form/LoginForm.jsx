import { useContext, useState } from 'react';
import { Form, Divider, Button, Modal, Header } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/LoginUsername';
import Password from '../Field/LoginPassword';
import LoginButton from '../Button/LoginButton';
import CloseButton from '../Button/CloseButton';
import BackButton from '../Button/BackupButton';
import EditDeleteForm from '../Form/EditForm';
import AdminForm from '../Form/AdminForm';
import { LoginContext } from '../Screen/LoginScreen';
import { api } from '../../../api/api';

const LoginForm = ({ size, history }) => {
    const { handle, initialValues } = useContext(LoginContext);
    const [users, setUsers] = useState(null);
    const [open, setOpen] = useState(false);
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
                                addUser={addUser}
                            />
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
                            setOpen(true);
                            api.getUsers((users) => {
                                // console.log(users);
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
