import { Form } from 'semantic-ui-react';

const CancelButton = ({ onClick }) => {
    return (
        <Form.Button
            type='button'
            secondary
            size='huge'
            content='Cancel'
            style={{ marginTop: '30px' }}
            onClick={onClick}
        />
    );
};

export default CancelButton;
