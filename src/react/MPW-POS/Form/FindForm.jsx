import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Field from '../Field';
import Button from '../Button';

export const FindForm = ({ handleSubmit, form }) => {
    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    const onSubmit = (event) => {
        handleSubmit(event);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Field name='phone' form={form} />
            <Field name='account' form={form} />
            <Field name='firstName' form={form} />
            <Field name='lastName' form={form} />
            <Button.Pulse name='find' />
            <Button.Pulse name='add' />
            <Button.Pulse name='report' />
            <Button.Pulse name='logout' />
        </Form>
    );
};

export default FindForm;
