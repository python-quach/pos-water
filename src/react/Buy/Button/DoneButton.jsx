import { Form } from 'semantic-ui-react';

const DoneButton = ({ handleDone, edit }) => {
    return (
        <Form.Button
            size='huge'
            disabled={edit}
            floated='right'
            type='button'
            content='Done'
            style={{
                // marginTop: '10px',
                width: '160px',
            }}
            onClick={handleDone}
        />
    );
};

export default DoneButton;
