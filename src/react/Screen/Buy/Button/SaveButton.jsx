import { Form } from 'semantic-ui-react';

const SaveButton = ({
    edit,
    values,
    setEdit,
    handleEdit,
    updateReceipt,
    updateHistory,
}) => (
    <Form.Button
        size='huge'
        type='button'
        color='google plus'
        style={{
            marginTop: '30px',
        }}
        disabled={
            values.areaCode && values.phone
                ? values.areaCode.length < 3 || values.phone.length < 8
                : true
        }
        content='Save'
        onClick={(event) => {
            event.preventDefault();
            if (!edit) {
                setEdit(true);
            } else {
                handleEdit(values, (result) => {
                    updateReceipt(result);
                    updateHistory();
                    setEdit(false);
                });
            }
        }}
    />
);

export default SaveButton;
