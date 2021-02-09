import { Form } from 'semantic-ui-react';

// const EditButton = ({
//     edit,
//     setEdit,
//     handleEdit,
//     values,
//     form,
//     initialValues,
// }) => {
//     return (
//         <>
//             {edit ? (
//                 <Form.Button
//                     type='button'
//                     content='Cancel'
//                     style={{
//                         marginTop: '30px',
//                     }}
//                     color='blue'
//                     onClick={(event) => {
//                         event.preventDefault();
//                         setEdit(false);
//                         form.reset({
//                             ...initialValues,
//                             prev: values.prev,
//                             remain: values.remain,
//                             buy: values.buy,
//                             fee: values.fee,
//                             renew: values.renew,
//                         });
//                     }}
//                 />
//             ) : null}
//             <Form.Button
//                 type='button'
//                 color={!edit ? 'vk' : 'google plus'}
//                 style={{
//                     marginTop: '30px',
//                 }}
//                 disabled={
//                     values.areaCode && values.phone
//                         ? values.areaCode.length < 3 || values.phone.length < 8
//                         : true
//                 }
//                 content={!edit ? 'Edit' : 'Save'}
//                 onClick={(event) => {
//                     event.preventDefault();
//                     if (!edit) {
//                         setEdit(true);
//                     } else {
//                         handleEdit(values, (result) => {
//                             console.table({ ...result });
//                             setEdit(false);
//                         });
//                     }
//                 }}
//             />
//         </>
//     );
// };

const EditButton = ({ edit, setEdit, handleEdit, values }) => {
    return (
        <Form.Button
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
