import { Form } from 'semantic-ui-react';

export const AdminButton = ({ onClick }) => (
    <Form.Button
        type='button'
        content='Admin'
        size='huge'
        icon='database'
        labelPosition='right'
        circular
        color='yellow'
        fluid
        onClick={onClick}
    />
);

export default AdminButton;
