import { Modal, Table, Button } from 'semantic-ui-react';

const CustomerHistory = (props) => (
    <Modal
        size='large'
        closeOnDimmerClick={true}
        closeOnDocumentClick={true}
        dimmer={'blurring'}
        onClose={() => props.setOpenHistory(false)}
        open={props.open}>
        <Modal.Header>Account History</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Table celled color='blue'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Account</Table.HeaderCell>
                            <Table.HeaderCell>Member Since</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Fee</Table.HeaderCell>
                            <Table.HeaderCell>Gallon</Table.HeaderCell>
                            <Table.HeaderCell>Previous</Table.HeaderCell>
                            <Table.HeaderCell>Buy</Table.HeaderCell>
                            <Table.HeaderCell>Remain</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.records
                            ? props.records.map((record, index) => (
                                  <Table.Row key={index}>
                                      <Table.Cell>{record.account}</Table.Cell>
                                      <Table.Cell>{record.since}</Table.Cell>
                                      <Table.Cell>
                                          {record.first} {record.last}
                                      </Table.Cell>
                                      <Table.Cell>{record.phone}</Table.Cell>
                                      <Table.Cell>{record.type}</Table.Cell>
                                      <Table.Cell>
                                          {record.fee ? `$${record.fee}` : '0'}
                                      </Table.Cell>
                                      <Table.Cell>{record.gallon}</Table.Cell>
                                      <Table.Cell>{record.previous}</Table.Cell>
                                      <Table.Cell>{record.buy}</Table.Cell>
                                      <Table.Cell>{record.remain}</Table.Cell>
                                      <Table.Cell>{record.date}</Table.Cell>
                                      <Table.Cell>{record.time}</Table.Cell>
                                  </Table.Row>
                              ))
                            : null}
                    </Table.Body>
                </Table>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={() => props.setOpenHistory(false)}>
                Close
            </Button>
        </Modal.Actions>
    </Modal>
);

export default CustomerHistory;
