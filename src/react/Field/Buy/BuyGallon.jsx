import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 6) return parseInt(onlyNums);
    return parseInt(onlyNums.slice(0, 5));
};

const BuyGallon = ({ disable, setDisable, edit, form, reset }) => {
    return (
        <Field
            name='buy'
            parse={normalizeGallon}
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='buy'
                    label='Buy'
                    className='AreaCode'
                    inverted
                    width={1}
                    disabled={edit}
                    onFocus={() => {
                        reset(form);
                        // form.change('fee', 0);
                        // form.change('renew', 0);
                        if (disable) {
                            setDisable(false);
                        }
                    }}
                />
            )}
        />
    );
};

export default BuyGallon;
