import { Table, Button } from 'semantic-ui-react';
import { printRenewReceipt } from '../../api/api';

const cellData = [
    'Renew Receipt',
    'Account',
    'Phone',
    'MemberSince',
    'First Name',
    'Last Name',
    'Fee',
    'Prev',
    'Renew',
    'Remain',
    'Date',
    'Time',
    'Action',
];

const RenewReceipt = ({ receipt, setOpenReceipt }) => (
    <Table celled striped selectable color='blue' size='large' compact>
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
                <Table.Cell>{receipt ? receipt.memberSince : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.firstName : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.lastName : ''}</Table.Cell>
                <Table.Cell>{receipt ? `$${receipt.fee}` : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.prev : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.renew : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.remain : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceDate : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceTime : ''}</Table.Cell>
                <Table.Cell textAlign='left'>
                    <Button
                        size='massive'
                        color='red'
                        content='Print Receipt'
                        onClick={() => {
                            console.log('Print Renew Receipt', receipt);
                            // const { membership } = receipt;
                            printRenewReceipt(receipt, (done) => {
                                console.log('Print Renew', done);
                                setOpenReceipt(false);
                            });
                        }}
                    />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);

export default RenewReceipt;
