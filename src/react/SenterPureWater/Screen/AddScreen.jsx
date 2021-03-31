import { useState, useEffect } from 'react';
import api from '../Api';
import Portal from './Portal';
import Header from './Header';
import Form from './Form';
import Field from './Field';
import Button from './Button';

const AddScreen = (props) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const close = (e) => {
        e.preventDefault();
        props.history.push('/dashboard');
    };

    const handleAddMembership = async (values) => {
        try {
            const data = await api.add(values);
            props.history.push({ pathname: '/buy', state: data });
        } catch (err) {
            setError(err);
            document.getElementById('account').focus();
        }
    };

    const field = {
        date: <Field.Date />,
        time: <Field.Time />,
        account: <Field.AddAccount error={error} />,
        phone: <Field.AddPhone />,
        firstName: <Field.AddFirstName />,
        lastName: <Field.AddLastName />,
        fee: <Field.Fee />,
        gallon: <Field.Gallon />,
    };

    const button = {
        add: (values, submitting) => (
            <Button.New values={values} submitting={submitting} />
        ),
        cancel: <Button.Cancel close={close} />,
    };

    useEffect(() => {
        setOpen(true);
    }, [open]);

    useEffect(() => {
        return () => {
            console.log('cleaned up');
        };
    }, []);

    return (
        <Portal.Add
            open={open}
            header={<Header.Senter />}
            form={
                <Form.Add
                    onSubmit={handleAddMembership}
                    field={field}
                    button={button}
                />
            }
        />
    );
};

export default AddScreen;
