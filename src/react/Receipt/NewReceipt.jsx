import { Table, Button } from 'semantic-ui-react';
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
    <Table celled striped selectable color='yellow' size='large' compact>
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
                <Table.Cell>{receipt ? receipt.memberSince : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.firstName : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.lastName : ''}</Table.Cell>
                <Table.Cell>{receipt ? `$${receipt.fee}` : '$0'}</Table.Cell>
                <Table.Cell>{receipt ? receipt.remain : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceDate : ''}</Table.Cell>
                <Table.Cell>{receipt ? receipt.invoiceTime : ''}</Table.Cell>
                <Table.Cell textAlign='left'>
                    <Button
                        size='massive'
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
                                console.log({ done });
                            });
                        }}
                    />
                    {openReceipt ? (
                        <Button
                            size='massive'
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
