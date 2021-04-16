import { Table, Form } from 'semantic-ui-react';

export const UserTable = ({ data }) => {
    const renderHeader = () => (
        <Table.Header fullWidth>
            <Table.Row style={{ fontSize: '22px' }}>
                <Table.HeaderCell content='Username' />
                <Table.HeaderCell content='Password' />
                <Table.HeaderCell
                    content='Action'
                    width={5}
                    textAlign='right'
                />
            </Table.Row>
        </Table.Header>
    );

    const renderRows = () =>
        data.map(({ username, password, user_id }, key) => (
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
                        onClick={() => {
                            removeUserFromList(user_id);
                        }}
                    />
                    <TransitionPulseButton
                        button={(handleClick) => (
                            <Form.Button
                                size='huge'
                                content='Edit'
                                floated='right'
                                primary
                                onClick={() =>
                                    handleClick(
                                        editUser({
                                            user_id,
                                            username,
                                            password,
                                        })
                                    )
                                }
                            />
                        )}
                    />
                </Table.Cell>
            </Table.Row>
        ));

    return (
        <Table celled compact definition basic inverted size='large'>
            {renderHeader()}
            <Table.Body>{renderRows()}</Table.Body>
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
    );
};
