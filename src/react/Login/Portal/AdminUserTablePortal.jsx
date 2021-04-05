import Portal from './index';
import { Form as FinalForm, Field } from 'react-final-form';
import { Table, Button, Form, Icon, Modal } from 'semantic-ui-react';

export const AdminUserTablePortal = ({
    open,
    users,
    edit,
    close,
    add,
    onSubmit,
    user,
    cancel,
    openAddEditModal,
}) => (
    <Portal open={open} gridColumn={{ style: { width: 575 } }}>
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
                                    onClick={() =>
                                        edit({
                                            user_id,
                                            username,
                                            password,
                                        })
                                    }
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
                                onClick={close}
                            />
                            <Form.Button
                                floated='right'
                                icon
                                type='button'
                                labelPosition='left'
                                primary
                                size='large'
                                onClick={add}>
                                <Icon name='user' /> Add User
                            </Form.Button>
                        </Form.Group>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        <Modal
            open={openAddEditModal}
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
                                    content={
                                        !user.user_id ? 'Add User' : 'Save'
                                    }
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
                                    onClick={cancel}
                                />
                            </Form.Group>
                        </Form>
                    )}
                />
            </Modal.Content>
        </Modal>
    </Portal>
);

export default AdminUserTablePortal;
