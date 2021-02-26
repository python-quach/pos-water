import { Form } from 'semantic-ui-react';

const EditButton = ({ edit, setEdit, handleEdit, values }) => {
    return (
        <Form.Button
            size='huge'
            type='button'
            color='vk'
            style={{
                marginTop: '30px',
            }}
            disabled={
                values.areaCode && values.phone
                    ? values.areaCode.length < 3 || values.phone.length < 8
                    : true
            }
            content='Edit'
            onClick={(event) => {
                event.preventDefault();
                if (!edit) {
                    setEdit(true);
                } else {
                    handleEdit(values, (result) => {
                        console.table({ ...result });
                        setEdit(false);
                    });
                }
            }}
        />
    );
};

export default EditButton;
