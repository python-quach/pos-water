import { useEffect, useState } from 'react';
import { DashBoardScreenField as Field } from './Field';
import { DashBoardScreenButton as Button } from './Button';
import Form from './Form';
import Portal from './Portal';
import Header from './Header';
import api from '../Api';

const DashBoardScreen = (props) => {
    const [open, setOpen] = useState(false);

    const onSubmit = async (values) => {
        try {
            const data = await api.findMembership(values);
            data.history
                ? props.history.push({ pathname: '/buy', state: data })
                : props.history.push({ pathname: '/account', state: data });
        } catch (err) {
            const field_id = err.message;
            document.getElementById(field_id).focus();
            return field_id;
        }
    };

    const logout = (event) => {
        event.preventDefault();
        props.history.push('/');
    };

    const add = (event) => {
        event.preventDefault();
        props.history.push({ pathname: '/add', state: { open: true } });
    };

    const report = (event) => {
        event.preventDefault();
        const date = new Date();
        api.getDailyReport(
            date.toLocaleDateString(),
            date.toLocaleTimeString(),
            (data) => {
                console.log({ data });
            }
        );
    };

    const field = {
        phone: (form) => <Field.Phone form={form} />,
        account: (form) => <Field.Account form={form} />,
        firstName: (form, values) => (
            <Field.FirstName form={form} values={values} />
        ),
        lastName: (form, values) => (
            <Field.LastName form={form} values={values} />
        ),
    };

    const button = {
        find: (values) => <Button.Find values={values} />,
        add: <Button.Add add={add} />,
        report: <Button.Report report={report} />,
        logout: <Button.Logout logout={logout} />,
    };

    const form = (
        <Form.Find onSubmit={onSubmit} field={field} button={button} />
    );

    useEffect(() => {
        setOpen(true);
    }, [open]);

    useEffect(() => {
        if (open) document.getElementById('phone').focus();
        return () => {};
    }, [open]);

    return (
        <Portal.DashBoard open={open} header={<Header.Senter />} form={form} />
    );
};

export default DashBoardScreen;
