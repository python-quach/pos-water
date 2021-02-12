import React from 'react';
import { Button, Table, Pagination } from 'semantic-ui-react';

const AccountScreen = (props) => {
    const memberships = props.history.location.state;
    const [account, setAccount] = React.useState(null);
    const [offset, setOffset] = React.useState(0);
    const [activePage, setActivePage] = React.useState(1);

    const Row = ({ account, firstName, lastName, fullname, phone }) => {
        return (
            <Table.Row
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    console.log('account', account);
                    props.api.find({ account }, (data) => {
                        props.api.lastRecord(({ record_id }) => {
                            console.log({ data, record_id });
                            props.history.push({
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
                <Table.Cell content={phone} />
            </Table.Row>
        );
    };

    const renderRows = () =>
        account
            ? account.map((member, index) => <Row key={index} {...member} />)
            : null;

    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
    };

    React.useEffect(() => {
        if (!memberships) {
            props.history.push('/dashboard');
        }
    });

    React.useEffect(() => {
        setAccount(
            memberships
                ? memberships.slice((activePage - 1) * 10, activePage * 10)
                : null
        );
    }, [setOffset, setAccount, activePage, offset, memberships]);

    return (
        <>
            <Table
                celled
                selectable
                color='blue'
                inverted
                className='MemberTable'
                size='large'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content='Account' />
                        <Table.HeaderCell content='First Name' />
                        <Table.HeaderCell content='Last Name' />
                        <Table.HeaderCell content='Full Name' />
                        <Table.HeaderCell content='Phone' />
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderRows()}</Table.Body>
            </Table>
            <Pagination
                activePage={activePage}
                onPageChange={onChange}
                totalPages={
                    memberships ? Math.ceil(memberships.length / 10) : 0
                }
            />
            <Button
                floated='right'
                content='Back'
                onClick={() => props.history.push('/')}
            />
        </>
    );
};
export default AccountScreen;
