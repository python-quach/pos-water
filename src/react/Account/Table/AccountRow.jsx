import { Table } from 'semantic-ui-react';
import { api } from '../../../api/api';

const AccountRow = ({
    account,
    history,
    firstName,
    lastName,
    fullname,
    areaCode,
    phone,
}) => {
    return (
        <Table.Row
            style={{ cursor: 'pointer' }}
            onClick={() => {
                console.log('account', account);
                api.find({ account }, (data) => {
                    api.lastRecord(({ record_id }) => {
                        console.log({ data, record_id });
                        history.push({
                            pathname: '/buy',
                            state: {
                                ...data.membership,
                                newRecordID: record_id,
                            },
                        });
                    });
                });
            }}>
            <Table.Cell content={account} />
            <Table.Cell content={firstName} />
            <Table.Cell content={lastName} />
            <Table.Cell content={fullname} />
            <Table.Cell content={areaCode} />
            <Table.Cell content={phone} />
        </Table.Row>
    );
};

export default AccountRow;
