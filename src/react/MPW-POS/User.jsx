import { useEffect } from 'react';

import Screen from './Screen';
import Header from './Header';
// import Button from './Button';
// import Field from './Field';
import Table from './Table';
import Modal from './Modal/UserModal';

import { useContext } from 'react';
import { StoreContext } from './store';

export const User = () => {
    const { screen, header, form, table, action, users, button } = useContext(
        StoreContext
    ).component.user;

    useEffect(() => {
        if (users.length === 0) action.read();
    }, [users, action]);

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <Table
                attr={table.attr}
                header={table.header}
                row={table.row.header}
                data={users}
                button={button}
                headerCells={table.cell.headerCells}
            />
            <Modal />
        </Screen>
    );
};

export default User;
