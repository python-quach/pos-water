import { Table, Pagination } from 'semantic-ui-react';

const cellData = [
    'Record',
    'Account',
    'Phone',
    'First Name',
    'Last Name',
    'Fee',
    'Renew',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
];

const Record = ({ records, totalPages, onChange, activePage }) => {
    return records ? (
        <>
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
                                    content={
                                        record.areaCode + '-' + record.phone
                                    }
                                />
                                <Table.Cell content={record.firstName} />
                                <Table.Cell content={record.lastName} />
                                <Table.Cell
                                    content={
                                        record.buy === '0' ||
                                        record.buy === null
                                            ? `$ ${record.fee || 0}`
                                            : `$ ${0}`
                                    }
                                />
                                <Table.Cell
                                    positive={record.renew ? true : false}
                                    content={record.renew || 0}
                                />
                                <Table.Cell
                                    content={
                                        record.renew
                                            ? record.remain - record.renew
                                            : record.prev
                                    }
                                />

                                <Table.Cell
                                    positive={
                                        record.buy === '0' || !record.buy
                                            ? true
                                            : false
                                    }
                                    content={
                                        record.buy === '0' && !record.renew
                                            ? 'NEW'
                                            : !record.buy
                                            ? 'RENEW'
                                            : record.buy
                                    }
                                />
                                <Table.Cell content={record.remain} />
                                <Table.Cell content={record.invoiceDate} />
                                <Table.Cell content={record.invoiceTime} />
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <Pagination
                activePage={activePage}
                onPageChange={onChange}
                totalPages={Math.ceil(totalPages / 10)}
                ellipsisItem={null}
            />
        </>
    ) : null;
};
export default Record;
