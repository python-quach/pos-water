import { Form } from 'semantic-ui-react';

export const CloseButton = ({ onClick }) => (
    <Form.Button
        content='Close'
        type='button'
        className='LoginButton'
        size='huge'
        icon='close'
        color='black'
        circular
        fluid
        onClick={onClick}
    />
);

export default CloseButton;
