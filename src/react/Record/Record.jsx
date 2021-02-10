import { Table } from 'semantic-ui-react';

const cellData = [
    'Record',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Prev',
    'Buy',
    'Remain',
    'Renew',
    'Fee',
    'Date',
    'Time',
];

const Record = ({ records }) => (
    <Table celled striped selectable color='teal'>
        <Table.Header>
            <Table.Row>
                {cellData.map((item, index) => (
                    <Table.HeaderCell content={item} key={index} />
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {records.map((record, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell content={record.record_id} />
                        <Table.Cell content={record.account} />
                        <Table.Cell
                            content={record.areaCode + '-' + record.phone}
                        />
                        <Table.Cell content={record.firstName} />
                        <Table.Cell content={record.lastName} />
                        <Table.Cell content={record.prev} />
                        <Table.Cell
                            positive={!record.buy}
                            content={record.buy || 'RENEW'}
                        />
                        <Table.Cell content={record.remain} />
                        <Table.Cell
                            positive={record.renew}
                            content={record.renew || 0}
                        />
                        <Table.Cell content={record.fee} />
                        <Table.Cell content={record.invoiceDate} />
                        <Table.Cell content={record.invoiceTime} />
                    </Table.Row>
                );
            })}
        </Table.Body>
    </Table>
);
export default Record;
