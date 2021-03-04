import { Form } from 'semantic-ui-react';

const CancelButton = ({ history }) => {
    return (
        <Form.Button
            size='huge'
            color='google plus'
            content='Cancel'
            style={{ marginTop: '30px', width: '160px' }}
            onClick={(e) => {
                e.preventDefault();
                history.push('/dashboard');
            }}
        />
    );
};

export default CancelButton;
