import { Form } from 'semantic-ui-react';

const CancelButton = ({ setEdit, form, initialValues, values }) => {
    return (
        <Form.Button
            size='huge'
            type='button'
            content='Cancel'
            style={{
                marginTop: '30px',
            }}
            color='blue'
            onClick={(event) => {
                event.preventDefault();
                setEdit(false);
                form.reset({
                    ...initialValues,
                    prev: values.prev,
                    remain: values.remain,
                    buy: values.buy,
                    fee: values.fee,
                    renew: values.renew,
                });
            }}
        />
    );
};

export default CancelButton;
