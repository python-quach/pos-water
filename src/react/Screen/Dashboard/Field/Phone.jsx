import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};

const Phone = ({ form, reset }) => {
    return (
        <Field
            name='phone'
            parse={normalizePhone}
            render={({ input }) => (
                <Form.Input
                    className='blueIcon'
                    id='phone'
                    placeholder='xxx-xxxx'
                    focus
                    type='text'
                    size='massive'
                    icon='whatsapp'
                    fluid
                    iconPosition='left'
                    transparent
                    value={input.value}
                    name={input.name}
                    onChange={(e, { value }) => {
                        reset();
                        return input.onChange(value);
                    }}
                    onFocus={() => {
                        form.batch(() => {
                            form.change('account', '');
                            form.change('firstName', '');
                            form.change('lastName', '');
                        });
                    }}
                />
            )}
        />
    );
};
export default Phone;
