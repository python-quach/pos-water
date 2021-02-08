import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const EditButton = ({ edit, setEdit, handleEdit, values, form }) => {
    const [original, setOriginal] = useState({});

    useEffect(() => {
        if (!edit) setOriginal(values);
    }, [edit, values]);

    return (
        <>
            {edit ? (
                <Form.Button
                    type='button'
                    content='Cancel'
                    style={{
                        marginTop: '30px',
                    }}
                    color='blue'
                    onClick={(event) => {
                        event.preventDefault();
                        setEdit(false);
                        form.reset({ ...original });
                    }}
                />
            ) : null}
            <Form.Button
                type='button'
                color={!edit ? 'vk' : 'google plus'}
                style={{
                    marginTop: '30px',
                }}
                disabled={
                    values.areaCode && values.phone
                        ? values.areaCode.length < 3 || values.phone.length < 8
                        : true
                }
                content={!edit ? 'Edit' : 'Save'}
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
        </>
    );
};

export default EditButton;
