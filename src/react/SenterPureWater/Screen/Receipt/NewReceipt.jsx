import { Table, Button } from 'semantic-ui-react';
import { channels } from '../../../../shared/constants';
const { ipcRenderer } = window;

const NewReceipt = ({ record }) => (
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
                <Table.Cell>{record.type} MEMBERSHIP</Table.Cell>
                <Table.Cell>${record.fee}</Table.Cell>
                <Table.Cell>{record.gallon}</Table.Cell>
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

                            const store = 'V&J Senter Pure Water';
                            const phone = '(408) 427-6146';
                            const renewFee = `Membership Fee: $${record.fee}`;
                            const fullname = `${record.first} ${record.last} -- ${record.phone}`;
                            const gallonLeft = `Gallon Total  : ${record.gallon}`;
                            const blank = '';
                            const time = `${record.date}  ${record.time}`;
                            const message = `Thank You                [Account#: ${record.account}]`;

                            const newReceipt = {
                                fullname,
                                renewFee,
                                blank,
                                gallonLeft,
                                message,
                                store,
                                phone,
                                time,
                                type: record.type,
                            };

                            ipcRenderer.send(channels.SENTER_PRINT, newReceipt);
                            ipcRenderer.on(
                                channels.SENTER_PRINT,
                                (_, response) => {
                                    ipcRenderer.removeAllListeners(
                                        channels.SENTER_PRINT
                                    );
                                }
                            );
                        }}
                    />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </>
);

export default NewReceipt;
