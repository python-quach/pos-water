import { Button } from 'semantic-ui-react';

const EditButton = ({ edit, setEdit, loading, setLoading }) => {
    return (
        <>
            {edit ? (
                <Button
                    floated='right'
                    content='Cancel Edit'
                    // color='vk'
                    color='blue'
                    onClick={() => {
                        setEdit(false);
                        // resetBuyForm();
                        // setEdited(false);
                    }}
                />
            ) : null}
            <Button
                // loading={edit}
                // loading={loa}
                // loading
                floated='right'
                color={!edit ? 'vk' : 'google plus'}
                content={!edit ? 'Edit Customer' : 'Save'}
                onClick={() => {
                    if (!edit) {
                        console.log('edit button click', edit);
                        setEdit(true);
                        // updateMembership(formBuy, (response) => {
                        //     setEdited(false);
                        //     setLoadingEdited(false);
                        // });
                    } else {
                        console.log('save button click');
                        setEdit(false);
                    }
                }}
            />
        </>
    );
};

export default EditButton;
