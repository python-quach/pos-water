import { Table, Button } from 'semantic-ui-react';

const AccountTable = ({ records, deleteAccount, button, modal }) => (
    <Table color='blue' celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Account</Table.HeaderCell>
                <Table.HeaderCell>MemberSince</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Gallon Remain</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {records.map((record, key) => (
                <Table.Row key={key} style={{ fontSize: '20px' }}>
                    <Table.Cell content={record.account} />
                    <Table.Cell content={record.since} />
                    <Table.Cell content={record.phone} />
                    <Table.Cell content={record.first + ' ' + record.last} />
                    <Table.Cell content={record.remain} />
                    <Table.Cell content={record.date + ' ' + record.time} />
                    <Table.Cell content={record.type} />
                    <Table.Cell
                        content={
                            <>
                                <Button.Group>
                                    {button.select(record.account)}
                                    <Button.Or
                                        size='huge'
                                        style={{ marginTop: '8px' }}
                                    />
                                    {button.delete(record)}
                                    <Button.Or
                                        size='huge'
                                        style={{ marginTop: '8px' }}
                                    />
                                    {button.done}
                                </Button.Group>
                                {deleteAccount && modal}
                            </>
                        }
                    />
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

const DefaultTable = {
    Account: AccountTable,
};

export default DefaultTable;
