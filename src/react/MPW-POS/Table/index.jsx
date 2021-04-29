import { Table, Form } from 'semantic-ui-react';
import Button from '../Button';

export const UserTable = ({ data, attr, header, row, headerCells, button }) => (
    <Table {...attr}>
        <Table.Header {...header}>
            <Table.Row {...row.header}>
                {headerCells.map((cell) => (
                    <Table.HeaderCell
                        key={cell.content}
                        width={cell.width}
                        textAlign={cell.textAlign}>
                        {cell.content}
                    </Table.HeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {data.map((user, key) => (
                <Table.Row key={key} {...row.body}>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.password}</Table.Cell>
                    <Table.Cell singleLine>
                        <Form>
                            <Form.Group>
                                <Button.Pulse
                                    attr={button.delete.attr}
                                    onClick={() =>
                                        button.delete.onClick(user.user_id)
                                    }
                                />
                                <Button.Pulse
                                    attr={button.edit.attr}
                                    onClick={() => button.edit.onClick(user)}
                                />
                            </Form.Group>
                        </Form>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

export default UserTable;
