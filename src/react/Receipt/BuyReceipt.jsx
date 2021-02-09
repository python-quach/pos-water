import { Table } from 'semantic-ui-react';

const cellData = [
    'Last Buy Receipt',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
];

const BuyReceipt = ({ receipt }) => (
    <Table celled striped selectable color='green'>
        <Table.Header>
            <Table.Row>
                {cellData.map((item, index) => (
                    <Table.HeaderCell content={item} key={index} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell content={receipt.record_id} />
                <Table.Cell content={receipt.account} />
                <Table.Cell content={receipt.areaCode + '-' + receipt.phone} />
                <Table.Cell content={receipt.firstName} />
                <Table.Cell content={receipt.lastName} />
                <Table.Cell content={receipt.prev} />
                <Table.Cell content={receipt.buy} />
                <Table.Cell content={receipt.remain} />
                <Table.Cell content={receipt.invoiceDate} />
                <Table.Cell content={receipt.invoiceTime} />
            </Table.Row>
        </Table.Body>
    </Table>
);
export default BuyReceipt;
