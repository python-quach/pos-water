import { useState } from 'react';
import { Button } from 'semantic-ui-react';

const EditButton = ({
    edit,
    setEdit,
    loading,
    setLoading,
    setSave,
    save,
    setCancel,
    handleEdit,
    values,
    cancel,
    form,
    initialValues,
    touched,
    pristine,
    dirty,
}) => {
    const [oldValue, setOldValue] = useState(values);
    return (
        <>
            {edit ? (
                <Button
                    floated='right'
                    content='Cancel'
                    color='blue'
                    onClick={(event) => {
                        event.preventDefault();
                        setEdit(false);
                        form.initialize({ ...values });
                        console.table([{ ...values }]);
                    }}
                />
            ) : null}
            <Button
                floated='right'
                color={!edit ? 'vk' : 'google plus'}
                content={!edit ? 'Edit' : 'Save'}
                onClick={(event) => {
                    event.preventDefault();
                    if (!edit) {
                        console.log('edit');
                        console.table([{ ...values }]);
                        setEdit(true);
                    } else {
                        console.log('saver');
                        console.table([{ ...values }]);
                        handleEdit(values);
                        setEdit(false);
                    }
                }}
            />
        </>
    );
};

export default EditButton;
