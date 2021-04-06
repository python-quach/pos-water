import { Form } from 'semantic-ui-react';

const CancelButton = ({ history }) => {
    return (
        <Form.Button
            secondary
            size='huge'
            content='Cancel'
            style={{ marginTop: '30px' }}
            onClick={(e) => {
                e.preventDefault();
                history.push('/dashboard');
            }}
        />
    );
};

export default CancelButton;
