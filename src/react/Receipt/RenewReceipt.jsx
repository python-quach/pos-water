import { Table } from 'semantic-ui-react';

const RenewReceipt = ({ receipt }) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Last RENEW Receipt</Table.HeaderCell>
                    <Table.HeaderCell>Account</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Fee</Table.HeaderCell>
                    <Table.HeaderCell>Prev </Table.HeaderCell>
                    <Table.HeaderCell>Renew</Table.HeaderCell>
                    <Table.HeaderCell>Remain</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
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
                    <Table.Cell>{receipt ? receipt.fee : ''}</Table.Cell>
                    <Table.Cell>{receipt ? receipt.prev : ''}</Table.Cell>
                    <Table.Cell>{receipt ? receipt.renew : ''}</Table.Cell>
                    <Table.Cell>{receipt ? receipt.remain : ''}</Table.Cell>
                    <Table.Cell>
                        {receipt ? receipt.invoiceDate : ''}
                    </Table.Cell>
                    <Table.Cell>
                        {receipt ? receipt.invoiceTime : ''}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

export default RenewReceipt;
