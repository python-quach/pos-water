import { Form } from 'semantic-ui-react';

export const TestButton = ({ onClick }) => (
    <Form.Button
        id='testButton'
        type='button'
        content='Test'
        color='green'
        size='huge'
        icon='test'
        labelPosition='right'
        circular
        fluid
        onClick={onClick}
    />
);

export default TestButton;
