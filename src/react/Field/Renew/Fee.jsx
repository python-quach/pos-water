import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const Fee = ({ name, setDisable, form, edit, reset, updateForm, values }) => {
    const handleKeyPress = (e) =>
        (e.key === 'Enter' || e.keyCode === 13) &&
        values.fee > 0 &&
        values.renew > 0
            ? form.submit().then(() => {
                  updateForm(form, values);
                  document.getElementById('buy').focus();
              })
            : null;

    return (
        <Field
            name={name}
            parse={normalizeFee}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    disabled={edit}
                    id='renew'
                    label='Fee'
                    className='AreaCode'
                    inverted
                    width={1}
                    onKeyDown={handleKeyPress}
                    onFocus={() => {
                        reset(form, values.prev);
                        setDisable(true);
                    }}
                />
            )}
        />
    );
};

export default Fee;
