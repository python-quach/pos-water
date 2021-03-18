import { Table, Button } from 'semantic-ui-react';

const RenewReceipt = ({ record }) => (
    <>
        <Table.Header>
            <Table.Row style={{ fontSize: '20px' }}>
                <Table.HeaderCell>Account</Table.HeaderCell>
                <Table.HeaderCell>MemberSince</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Fee</Table.HeaderCell>
                <Table.HeaderCell>Gallon</Table.HeaderCell>
                <Table.HeaderCell>Prev</Table.HeaderCell>
                <Table.HeaderCell>Remain</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row style={{ fontSize: '20px' }}>
                <Table.Cell>{record.account}</Table.Cell>
                <Table.Cell>{record.since}</Table.Cell>
                <Table.Cell>{record.phone}</Table.Cell>
                <Table.Cell>{record.first + ' ' + record.last}</Table.Cell>
                <Table.Cell>{record.type}</Table.Cell>
                <Table.Cell>${record.fee}</Table.Cell>
                <Table.Cell>{record.gallon}</Table.Cell>
                <Table.Cell>{record.previous}</Table.Cell>
                <Table.Cell>{record.remain}</Table.Cell>
                <Table.Cell>{record.date}</Table.Cell>
                <Table.Cell>{record.time}</Table.Cell>
                <Table.Cell>
                    <Button size='huge' color='yellow' fluid content='PRINT' />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </>
);

export default RenewReceipt;
