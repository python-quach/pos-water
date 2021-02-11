import { Table } from 'semantic-ui-react';

const cellData = [
    'New Membership',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Fee',
    // 'Renew',
    // 'Prev',
    // 'Buy',
    'Gallon',
    'Date',
    'Time',
];

const NewReceipt = ({ receipt }) => (
    <Table celled striped selectable color='green'>
        <Table.Header>
            <Table.Row>
                {cellData.map((item, index) => (
                    <Table.HeaderCell content={item} key={index} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row positive>
                <Table.Cell>{receipt ? receipt.record_id : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.account : ''}</Table.Cell>
                <Table.Cell>
                    {receipt ? receipt.areaCode + '-' + receipt.phone : ''}
                </Table.Cell>
                <Table.Cell>{receipt ? receipt.firstName : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.lastName : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.fee : ''}</Table.Cell>
                {/* <Table.Cell>{receipt.renew ? receipt.renew : 'NEW'}</Table.Cell> */}
                {/* <Table.Cell>{receipt ? receipt.prev : ''}</Table.Cell> */}
                {/* <Table.Cell>{receipt.buy ? receipt.buy : 'NEW'}</Table.Cell> */}
                <Table.Cell>{receipt ? receipt.remain : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceDate : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceTime : ''}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);
export default NewReceipt;
