import { Table, Button, Form, Icon, Header } from 'semantic-ui-react';

export const AdminTable = ({ users, edit, remove, add, done }) => (
    <Table compact definition selectable basic inverted size='large'>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='3'>
                    <Header as='h1' inverted size='huge' textAlign='left'>
                        <Icon name='braille' color='blue' />
                        <Header.Content>
                            Mckee Pure Water
                            <Header.Subheader content='User Admin' />
                        </Header.Content>
                    </Header>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Password</Table.HeaderCell>
                <Table.HeaderCell width={6}>Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Rows users={users} edit={edit} remove={remove} />
        </Table.Body>
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='3'>
                    <Form.Group>
                        <DoneButton onClick={done} />
                        <AddButton onClick={add} />
                    </Form.Group>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
);

const Rows = ({ users, edit, remove }) => {
    return users.map(({ username, password, user_id }, key) => (
        <Table.Row key={key}>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>{password}</Table.Cell>
            <Table.Cell>
                <EditButton onClick={() => edit(user_id, username, password)} />
                <DeleteButton onClick={() => remove(user_id)} />
            </Table.Cell>
        </Table.Row>
    ));
};

export const EditButton = ({ onClick }) => (
    <Button size='large' content='Edit' primary onClick={onClick} />
);

export const DeleteButton = ({ onClick }) => (
    <Button
        content='Delete'
        type='button'
        size='large'
        negative
        onClick={onClick}
    />
);

export const DoneButton = ({ onClick }) => (
    <Form.Button
        type='button'
        icon
        content='Done'
        floated='right'
        secondary
        size='large'
        onClick={onClick}
    />
);

export const AddButton = ({ onClick }) => (
    <Form.Button
        floated='right'
        icon
        type='button'
        labelPosition='left'
        primary
        size='large'
        onClick={onClick}>
        <Icon name='user' /> Add User
    </Form.Button>
);

export default AdminTable;
