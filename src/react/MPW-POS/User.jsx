import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';

import Screen from './Screen';
import Header from './Header';
import Table from './Table';
import Button from './Button';
import Modal from './Modal/UserModal';

import { useContext } from 'react';
import { StoreContext } from './store';

export const User = () => {
    const { screen, header, table, action, users, button } = useContext(
        StoreContext
    ).component.user;

    useEffect(() => {
        if (users.length === 0) action.fetchData();
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
            <Form>
                <Form.Group>
                    <Form.Input type='hidden' width={11} />
                    <Button.Pulse
                        attr={button.add.attr}
                        onClick={button.add.onClick}
                    />
                    <Button.Pulse
                        attr={button.done.attr}
                        onClick={button.done.onClick}
                    />
                </Form.Group>
            </Form>
            <Modal />
        </Screen>
    );
};

export default User;
