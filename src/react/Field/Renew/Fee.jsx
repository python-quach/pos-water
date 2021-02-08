import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeFee = (value) => {
    if (!value) return 0;

    const onlyNums = value.replace(/[^\d]/g, '');

    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const Fee = ({
    name,
    disable,
    setDisable,
    form,
    remain,
    previous,
    edit,
    reset,
    fee,
    renew,
    updateForm,
    values,
}) => {
    return (
        <Field
            name={name}
            parse={normalizeFee}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    disabled={edit}
                    id='renew'
                    label='Renew Fee'
                    className='AreaCode'
                    inverted
                    width={1}
                    onKeyPress={(e) =>
                        (e.key === 'Enter' || e.keyCode === 13) &&
                        fee > 0 &&
                        renew > 0
                            ? form.submit().then(() => {
                                  updateForm(form, values);
                                  document.getElementById('buy').focus();
                              })
                            : null
                    }
                    onFocus={() => {
                        reset(form, previous);
                        setDisable(true);
                    }}
                />
            )}
        />
    );
};

export default Fee;
