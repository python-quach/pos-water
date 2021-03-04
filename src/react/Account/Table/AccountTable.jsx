import { Table } from 'semantic-ui-react';

const AccountTable = ({ children }) => {
    return (
        <Table celled color='blue' size='large'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content='Account' />
                    <Table.HeaderCell content='Member Since' />
                    <Table.HeaderCell content='First Name' />
                    <Table.HeaderCell content='Last Name' />
                    <Table.HeaderCell content='Full Name' />
                    <Table.HeaderCell content='Area Code' />
                    <Table.HeaderCell content='Phone' />
                    <Table.HeaderCell content='Action' />
                </Table.Row>
            </Table.Header>
            <Table.Body>{children}</Table.Body>
        </Table>
    );
};

export default AccountTable;
