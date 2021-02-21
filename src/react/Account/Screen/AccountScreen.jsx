import { useEffect, useState } from 'react';
import Portal from '../Portal/Portal';
import Table from '../Table/AccountTable';
import Row from '../Table/AccountRow';
import { Button, Pagination } from 'semantic-ui-react';

export const config = {
    animation: 'fade in',
    duration: 300,
    segment: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 1000,
        backgroundColor: '#002b487d',
    },
    grid: {
        style: { height: '100vh' },
    },
    gridColumn: {},
};

const renderRows = function (account, history) {
    return account
        ? account.map((member, index) => (
              <Row key={index} {...member} history={history} />
          ))
        : null;
};

const AccountScreen = ({ history }) => {
    const memberships = history.location.state;

    const [account, setAccount] = useState(null);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const onChange = (_, pageInfo) => {
        setActivePage(pageInfo.activePage);
    };

    useEffect(() => {
        if (!memberships) {
            history.push('/dashboard');
        }
    });

    useEffect(() => {
        setAccount(
            memberships
                ? memberships.slice((activePage - 1) * 10, activePage * 10)
                : null
        );
    }, [setOffset, setAccount, activePage, offset, memberships]);

    return (
        <Portal {...config}>
            <Table>{renderRows(account, history)}</Table>
            <Pagination
                size='massive'
                activePage={activePage}
                onPageChange={onChange}
                totalPages={
                    memberships ? Math.ceil(memberships.length / 10) : 0
                }
            />
            <Button
                size='massive'
                floated='right'
                content='Back'
                onClick={() => history.push('/dashboard')}
            />
        </Portal>
    );
};
export default AccountScreen;
