import { Table, Button, Form, Icon } from 'semantic-ui-react';

export const UserTable = (users, edit, close, add) => (
    <Table celled compact definition basic inverted size='large'>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Password</Table.HeaderCell>
                <Table.HeaderCell width={6}>Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {users.map(({ username, password, user_id }, key) => (
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
                        <Button content='Delete' negative size='large' />
                    </Table.Cell>
                </Table.Row>
            ))}
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
);

export default UserTable;
