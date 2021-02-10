import { Table } from 'semantic-ui-react';
import data from './data';

const RenewReceipt = ({ receipt }) => (
    <Table
        celled
        selectable
        striped
        color='blue'
        headerRow={data.renewHeader}
        tableData={data.renewData(receipt)}
        renderBodyRow={data.renewRow}
    />
);

export default RenewReceipt;
