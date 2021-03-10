import { useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Table, Button, Modal, Header, Form, Message } from 'semantic-ui-react';
import { api } from '../../../api/api';

const AccountRow = ({
    account,
    history,
    firstName,
    lastName,
    fullname,
    areaCode,
    phone,
    memberSince,
    setAccount,
}) => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // console.log({ memberSince });

    const onSubmit = async (values) => {
        console.log('onSubmit:', values);

        api.deleteAccount(values, (response) => {
            console.log('Delete Response From Server: ', response);
            if (response.delete) {
                setErrorMessage('');
                setOpen(false);
                setAccount((prevAccount) => {
                    return prevAccount.filter(
                        (account) =>
                            account.account + account.memberSince !==
                            values.account + values.memberSince
                    );
                });
            } else {
                console.log(response.delete);
                setErrorMessage(
                    'Unable to delete account, please try password again'
                );
            }
        });
    };

    return (
        <Table.Row>
            <Table.Cell content={account} />
            <Table.Cell content={memberSince} />
            <Table.Cell content={firstName} />
            <Table.Cell content={lastName} />
            <Table.Cell content={fullname} />
            <Table.Cell content={areaCode} />
            <Table.Cell content={phone} />
            <Table.Cell>
                <Button
                    size='huge'
                    content='Select'
                    primary
                    onClick={(e) => {
                        e.preventDefault();
                        // console.log('account', account);
                        api.find(
                            { account, phone, firstName, lastName },
                            (data) => {
                                api.lastRecord(({ record_id }) => {
                                    // console.log({ data, record_id });
                                    history.push({
                                        pathname: '/buy',
                                        state: {
                                            ...data.membership,
                                            newRecordID: record_id,
                                        },
                                    });
                                });
                            }
                        );
                    }}
                />
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Button
                            negative
                            size='huge'
                            onClick={(e) => {
                                e.preventDefault();
                                console.log('Delete account', {
                                    account,
                                    phone,
                                    fullname,
                                });
                            }}>
                            Delete
                        </Button>
                    }>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>
                                Admin Password Required to Delete Account
                            </Header>
                            <Table celled size='large' striped>
                                <Table.Header>
                                    <Table.HeaderCell>Account</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        MemberSince
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Phone</Table.HeaderCell>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{account}</Table.Cell>
                                        <Table.Cell>{memberSince}</Table.Cell>
                                        <Table.Cell>{fullname}</Table.Cell>
                                        <Table.Cell>
                                            ({areaCode})-{phone}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <FinalForm
                            onSubmit={onSubmit}
                            initialValues={{
                                account,
                                memberSince,
                                phone,
                                lastName,
                                firstName,
                                fullname,
                            }}
                            render={({ handleSubmit, values }) => {
                                return (
                                    <Form
                                        onSubmit={(event) => {
                                            handleSubmit(event);
                                        }}>
                                        <Form.Group inline>
                                            <Field
                                                name='password'
                                                render={({ input }) => (
                                                    <Form.Input
                                                        {...input}
                                                        type='password'
                                                        id='password'
                                                        label='Password'
                                                        placeholder='Enter Admin Password'
                                                    />
                                                )}
                                            />
                                            <Form.Button negative>
                                                Confirm Delete
                                            </Form.Button>
                                            <Button
                                                color='black'
                                                onClick={() => setOpen(false)}>
                                                Cancel
                                            </Button>
                                        </Form.Group>
                                        {errorMessage && (
                                            <Message
                                                negative
                                                content={errorMessage}
                                            />
                                        )}
                                    </Form>
                                );
                            }}
                        />
                        {/* <Button
                            negative
                            content='Delete'
                            labelPosition='right'
                            icon='remove'
                            onClick={() => setOpen(false)}
                        /> */}
                    </Modal.Actions>
                </Modal>
            </Table.Cell>
        </Table.Row>
    );
};

export default AccountRow;
