import { Form } from 'semantic-ui-react';

const CancelButton = ({ onClick, style }) => (
    <Form.Button
        content='Cancel'
        size='huge'
        color='blue'
        type='button'
        style={style}
        onClick={onClick}
    />
);

export default CancelButton;
