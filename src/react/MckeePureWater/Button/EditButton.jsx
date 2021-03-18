import { Form } from 'semantic-ui-react';

export const EditButton = ({
    values,
    setEdit,
    edit,
    handleEdit,
    setOpenReceipt,
}) => (
    <Form.Button
        type='button'
        disabled={
            !values.first ||
            !values.last ||
            !values.phone ||
            values.phone.length < 14
        }
        content={edit ? 'Save' : 'Edit'}
        color={edit ? 'google plus' : 'vk'}
        size='huge'
        style={{ marginTop: '30px' }}
        onClick={(e) => {
            e.preventDefault();
            console.log('Edit', values);
            if (edit) {
                setOpenReceipt(false);
                handleEdit(values)
                    .then((data) => {
                        setOpenReceipt(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            setEdit((prevEdit) => !prevEdit);
        }}
    />
);
