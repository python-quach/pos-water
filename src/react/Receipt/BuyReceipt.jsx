import { Table } from 'semantic-ui-react';
import data from './data';

const BuyReceipt = ({ receipt }) => (
    <Table
        celled
        striped
        selectable
        color='green'
        headerRow={data.buyHeader}
        tableData={data.buyData(receipt)}
        renderBodyRow={data.buyRow}
    />
);
export default BuyReceipt;
