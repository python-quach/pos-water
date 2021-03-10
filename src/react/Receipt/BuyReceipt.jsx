import { Table, Button, Header } from 'semantic-ui-react';
import { printBuyReceipt } from '../../api/api';

const cellData = [
    'Buy Receipt',
    'Account',
    'Phone',
    'MemberSince',
    'First Name',
    'Last Name',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
    'Action',
];

const BuyReceipt = ({ receipt, setOpenReceipt, openReceipt }) => (
    // <Table celled striped selectable color='green' size='large' compact>
    <Table celled striped selectable color='green' compact>
        <Table.Header>
            <Table.Row>
                {cellData.map((item, index) => (
                    <Table.HeaderCell content={item} key={index} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Header>{receipt.record_id}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.account}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.areaCode + '-' + receipt.phone}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.memberSince}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.firstName}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.lastName}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.prev}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.buy}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.remain}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.invoiceDate}</Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>{receipt.invoiceTime}</Header>
                </Table.Cell>
                <Table.Cell textAlign='left'>
                    <Button
                        size='large'
                        color='red'
                        content='Print Receipt'
                        onClick={() => {
                            // console.log('Print Buy Receipt', receipt);
                            printBuyReceipt(receipt, (done) => {
                                console.log('Print Buy', done);
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
export default BuyReceipt;
