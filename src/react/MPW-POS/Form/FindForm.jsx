import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import Field from '../Field';
import Button from '../Button';

export const FindForm = ({ handleSubmit, form }) => {
    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    const onSubmit = (event) => {
        handleSubmit(event)
            .then()
            .catch((err) => {
                console.log(err);
                document.getElementById('phone').focus();
                form.reset({});
            });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Field name='phone' type='dashboard' form={form} />
            <Field name='account' type='dashboard' form={form} />
            <Field name='firstName' type='dashboard' form={form} />
            <Field name='lastName' type='dashboard' form={form} />
            <Button.Pulse name='find' type='dashboard' />
            <Button.Pulse name='add' type='dashboard' />
            <Button.Pulse name='report' type='dashboard' />
            <Button.Pulse name='logout' type='dashboard' />
        </Form>
    );
};

export default FindForm;
