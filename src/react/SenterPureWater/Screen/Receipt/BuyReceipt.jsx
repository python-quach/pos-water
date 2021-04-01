import { Table, Button } from 'semantic-ui-react';
import { channels } from '../../../../shared/constants';
const { ipcRenderer } = window;

const BuyReceipt = ({ record, open, setOpen, setOpenReceipt }) => (
    <>
        <Table.Header>
            <Table.Row style={{ fontSize: '20px' }}>
                <Table.HeaderCell>Account</Table.HeaderCell>
                <Table.HeaderCell>MemberSince</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Prev</Table.HeaderCell>
                <Table.HeaderCell>Buy</Table.HeaderCell>
                <Table.HeaderCell>Remain</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Print</Table.HeaderCell>
                {open && <Table.HeaderCell>Done</Table.HeaderCell>}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row style={{ fontSize: '20px' }}>
                <Table.Cell>{record.account}</Table.Cell>
                <Table.Cell>{record.since}</Table.Cell>
                <Table.Cell>{record.phone}</Table.Cell>
                <Table.Cell>{record.first + ' ' + record.last}</Table.Cell>
                <Table.Cell>{record.type}</Table.Cell>
                <Table.Cell>{record.previous}</Table.Cell>
                <Table.Cell>{record.buy}</Table.Cell>
                <Table.Cell>{record.remain}</Table.Cell>
                <Table.Cell>{record.date}</Table.Cell>
                <Table.Cell>{record.time}</Table.Cell>
                <Table.Cell>
                    <Button
                        size='huge'
                        color='yellow'
                        fluid
                        content='PRINT'
                        onClick={(e) => {
                            e.preventDefault();

                            const fullname = `${record.first} ${record.last} -- ${record.phone}`;
                            const prevGallon = `Gallon Prev: ${record.previous}`;
                            const gallonBuy = `Gallon Buy : ${record.buy}`;
                            const blank = '';
                            const gallonLeft = `Gallon Left: ${record.remain}`;
                            const message = `Thank You                [Account#: ${record.account}]`;
                            const store = 'V&J Senter Pure Water';
                            const phone = '(408) 427-6146';

                            const buyReceipt = {
                                fullname,
                                prevGallon,
                                gallonBuy,
                                blank,
                                gallonLeft,
                                message,
                                store,
                                phone,
                                date: record.date,
                                time: record.time,
                                type: record.type,
                            };

                            ipcRenderer.send(channels.SENTER_PRINT, buyReceipt);
                            ipcRenderer.on(
                                channels.SENTER_PRINT,
                                (_, response) => {
                                    ipcRenderer.removeAllListeners(
                                        channels.SENTER_PRINT
                                    );
                                    setOpen(false);
                                }
                            );
                            // setOpen(false);
                        }}
                    />
                </Table.Cell>
                {open && (
                    <Table.Cell>
                        <Button
                            size='huge'
                            color='black'
                            fluid
                            content='DONE'
                            onClick={(e) => {
                                e.preventDefault();
                                // setOpenReceipt(true);
                                setOpen(false);
                            }}
                        />
                    </Table.Cell>
                )}
            </Table.Row>
        </Table.Body>
    </>
);

export default BuyReceipt;
