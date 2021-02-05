import { Button } from 'semantic-ui-react';

const EditButton = ({ edit, setEdit }) => {
    return (
        <>
            {edit ? (
                <Button
                    floated='right'
                    content='Cancel Edit'
                    color='blue'
                    onClick={() => {
                        // resetBuyForm();
                        // setEdited(false);
                    }}
                />
            ) : null}
            <Button
                // loading={edit}
                // loading={loadingEdited}
                // loading
                // floated='right'
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
                        setEdit(false);
                    }
                }}
            />
        </>
    );
};

export default EditButton;
