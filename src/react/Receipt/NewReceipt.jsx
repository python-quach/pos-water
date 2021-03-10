import { Table, Button, Header } from 'semantic-ui-react';
import { print } from '../../api/api';

const cellData = [
    'New Membership',
    'Account',
    'Phone',
    'MemberSince',
    'First Name',
    'Last Name',
    'Fee',
    'Gallon',
    'Date',
    'Time',
    'Action',
];

const NewReceipt = ({ receipt, setOpenReceipt, openReceipt }) => (
    // <Table celled striped selectable color='yellow' size='large' compact>
    <Table celled striped selectable color='yellow' compact>
        <Table.Header>
            <Table.Row>
                {cellData.map((item, index) => (
                    <Table.HeaderCell content={item} key={index} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row positive>
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
                    <Header>{receipt ? `$${receipt.fee}` : '$0'}</Header>
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
                            console.log('Print New Receipt', receipt);

                            const {
                                fee,
                                remain,
                                fourDigit,
                                fullname,
                                invoiceDate,
                                invoiceTime,
                                account,
                            } = receipt;

                            const printData = {
                                field9: fee,
                                field4: fullname,
                                field7: fourDigit,
                                field31: remain,
                                field15: invoiceDate,
                                field32: invoiceTime,
                                field22: account,
                            };

                            print(printData, (done) => {
                                // console.log({ done });
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
export default NewReceipt;
