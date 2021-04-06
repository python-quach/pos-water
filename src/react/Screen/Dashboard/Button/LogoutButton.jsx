import { Form } from 'semantic-ui-react';

const LogoutButton = ({ onClick }) => (
    <Form.Button
        id='LogoutButton'
        content='Logout'
        size='huge'
        color='black'
        icon='sign-out'
        labelPosition='right'
        circular
        fluid
        onClick={onClick}
    />
);

export default LogoutButton;
