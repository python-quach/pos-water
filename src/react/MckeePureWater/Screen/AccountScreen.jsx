import { Segment, Header, Table, Button, Label } from 'semantic-ui-react';

const AccountScreen = (props) => {
    return (
        <Segment raised>
            <Header size='huge' block content='Account Screen' />
            <Table color='blue' celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Account</Table.HeaderCell>
                        <Table.HeaderCell>MemberSince</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>
                            Last Purchase Receipt
                        </Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>12345</Table.Cell>
                        <Table.Cell>5/12/2020</Table.Cell>
                        <Table.Cell>408-386-5089</Table.Cell>
                        <Table.Cell>Hung Quach</Table.Cell>
                        <Table.Cell>
                            <Label size='large' ribbon color='blue'>
                                3/10/2021 : Buy 10: Remain: 100
                            </Label>
                        </Table.Cell>
                        <Table.Cell>
                            <Button.Group>
                                <Button primary>Select</Button>
                                <Button.Or />
                                <Button negative>Delete</Button>
                            </Button.Group>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
};

export default AccountScreen;
