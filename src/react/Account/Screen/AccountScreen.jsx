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

const renderRows = function (account, history, setAccount) {
    return account
        ? account.map((member, index) => (
              <Row
                  key={index}
                  {...member}
                  history={history}
                  setAccount={setAccount}
              />
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

    // This will show max 10 member per page
    useEffect(() => {
        setAccount(
            memberships
                ? // ? memberships.slice((activePage - 1) * 10, activePage * 10)
                  memberships.slice((activePage - 1) * 5, activePage * 5)
                : null
        );
    }, [setOffset, setAccount, activePage, offset, memberships]);

    // useEffect(() => {
    //     console.log(account);
    // });

    return (
        <Portal {...config}>
            <Table>{renderRows(account, history, setAccount)}</Table>
            <Pagination
                size='massive'
                activePage={activePage}
                onPageChange={onChange}
                totalPages={
                    // memberships ? Math.ceil(memberships.length / 10) : 0
                    memberships ? Math.ceil(memberships.length / 5) : 0
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
