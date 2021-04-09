import { Table, Button, Header } from 'semantic-ui-react';
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

const RenewReceipt = ({ receipt, setOpenReceipt, openReceipt }) => (
    <Table celled striped selectable color='blue' compact>
        <Table.Header>
            <Table.Row>
                {cellData.map((cell, index) => (
                    <Table.HeaderCell key={index} content={cell} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header>{receipt ? receipt.record_id : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.account : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>
                        {receipt ? receipt.areaCode + '-' + receipt.phone : ''}
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.memberSince : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.firstName : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.lastName : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? `$${receipt.fee}` : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.prev : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.renew : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.remain : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.invoiceDate : ''}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt ? receipt.invoiceTime : ''}</Header>
                </Table.Cell>
                <Table.Cell textAlign='left'>
                    <Button
                        size='large'
                        color='red'
                        content='Print Receipt'
                        onClick={() => {
                            console.log('Print Renew Receipt', receipt);
                            printRenewReceipt(receipt, (done) => {
                                console.log('Print Renew', done);
                                setOpenReceipt(false);
                            });
                        }}
                    />
                    {openReceipt ? (
                        <Button
                            size='large'
                            color='black'
                            content='Close'
                            onClick={() => {
                                setOpenReceipt(false);
                            }}
                        />
                    ) : null}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);

export default RenewReceipt;
