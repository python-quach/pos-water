import { Form } from 'semantic-ui-react';

const EditButton = ({ onClick, disabled, style }) => (
    <Form.Button
        content='Edit'
        size='huge'
        type='button'
        color='vk'
        style={style}
        disabled={disabled}
        onClick={onClick}
    />
);

export default EditButton;
