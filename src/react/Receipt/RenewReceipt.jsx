import { Table } from 'semantic-ui-react';

const cellData = [
    'Renew Receipt',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Fee',
    'Prev',
    'Renew',
    'Remain',
    'Date',
    'Time',
];

const RenewReceipt = ({ receipt }) => (
    <Table celled striped selectable color='blue' size='large'>
        <Table.Header>
            <Table.Row>
                {cellData.map((cell, index) => (
                    <Table.HeaderCell key={index} content={cell} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>{receipt ? receipt.record_id : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.account : ''}</Table.Cell>
                <Table.Cell>
                    {receipt ? receipt.areaCode + '-' + receipt.phone : ''}
                </Table.Cell>
                <Table.Cell>{receipt ? receipt.firstName : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.lastName : ''}</Table.Cell>
                <Table.Cell>{receipt ? `$${receipt.fee}` : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.prev : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.renew : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.remain : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceDate : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceTime : ''}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);

export default RenewReceipt;
