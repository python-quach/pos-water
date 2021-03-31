import { useEffect, useState } from 'react';
import api from '../Api';
import Field from './Field';
import Button from './Button';
import Form from './Form';
import Portal from './Portal';
import Header from './Header';

const DashBoardScreen = (props) => {
    const [open, setOpen] = useState(false);

    const onSubmit = async (values) => {
        try {
            const data = await api.findMembership(values);
            console.log('RESPONSE FROM SERVER', data);
            data.history
                ? props.history.push({ pathname: '/buy', state: data })
                : props.history.push({ pathname: '/account', state: data });
        } catch (err) {
            console.log('ERROR CATCH: ', { err });
            const field_id = err.message;
            document.getElementById(field_id).focus();
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
        console.log('Daily Report', date.toLocaleDateString());
        api.getDailyReport(
            date.toLocaleDateString(),
            date.toLocaleTimeString(),
            (data) => {
                console.log({ data });
            }
        );
    };

    const field = {
        phone: <Field.Phone />,
        account: <Field.Account />,
        firstName: <Field.FirstName />,
        lastName: <Field.LastName />,
    };

    const button = {
        find: (values) => <Button.Find values={values} />,
        add: <Button.Add add={add} />,
        report: <Button.Report report={report} />,
        logout: <Button.Logout logout={logout} />,
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
        <Portal.DashBoard
            open={open}
            header={<Header.Senter />}
            form={
                <Form.Find onSubmit={onSubmit} field={field} button={button} />
            }
        />
    );
};

export default DashBoardScreen;
