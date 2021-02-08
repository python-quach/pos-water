import { Form } from 'semantic-ui-react';

const DoneButton = ({ handleDone, edit }) => {
    return !edit ? (
        <Form.Button
            type='button'
            content='Done'
            style={{
                marginTop: '30px',
            }}
            onClick={() => {
                handleDone();
                console.clear();
            }}
        />
    ) : null;
};

export default DoneButton;
