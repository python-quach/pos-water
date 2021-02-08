import { Form } from 'semantic-ui-react';

const DoneButton = ({ handleDone, edit }) => {
    return (
        <Form.Button
            disabled={edit}
            floated='right'
            type='button'
            content='Done'
            style={{
                // marginTop: '30px',
                marginTop: '10px',
                width: '100px',
            }}
            onClick={() => {
                handleDone();
                console.clear();
            }}
        />
    );

    // return !edit ? (
    //     <Form.Button
    //         disabled={edit}
    //         floated='right'
    //         type='button'
    //         content='Done'
    //         style={{
    //             // marginTop: '30px',
    //             marginTop: '10px',
    //             width: '100px',
    //         }}
    //         onClick={() => {
    //             handleDone();
    //             console.clear();
    //         }}
    //     />
    // ) : null;
};

export default DoneButton;
