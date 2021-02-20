import { Table, Button } from 'semantic-ui-react';
import { printBuyReceipt } from '../../api/api';

const cellData = [
    'Buy Receipt',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
    'Action',
];

const BuyReceipt = ({ receipt, setOpenReceipt }) => (
    <Table celled striped selectable color='green' size='large' compact>
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
                <Table.Cell textAlign='left'>
                    <Button
                        size='massive'
                        color='red'
                        content='Print Receipt'
                        onClick={() => {
                            console.log('Print Buy Receipt', receipt);
                            // const { membership } = receipt;
                            printBuyReceipt(receipt, (done) => {
                                console.log('Print Buy', done);
                                setOpenReceipt(false);
                            });
                        }}
                    />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);
export default BuyReceipt;
