import { useState } from 'react';
import Portal from './Portal';
import Form from './Form';
import Field from './Field';
import api from '../Api';
import Button from './Button';
import Header from './Header';

function LoginScreen({ history }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState(null);

    const handleUserLogin = async (values) => {
        try {
            const user = await api.login(values);
            history.push({
                pathname: '/dashboard',
                state: { user },
            });
        } catch (err) {
            setError(err.message);
            document.getElementById('username').focus();
        }
    };

    const handleBackup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await api.backup();
            setFileSave(result.open);
            setLoading(false);
        } catch (err) {
            return console.log(err.message);
        }
    };

    const clearError = (e, input) => {
        e.preventDefault();
        setError(false);
        return input.onChange(e.target.value);
    };

    const field = {
        username: <Field.Username clearError={clearError} />,
        password: <Field.Password clearError={clearError} />,
    };

    const button = {
        login: <Button.Login error={error} />,
        close: <Button.Close closeApp={api.closeApp} />,
        backup: (
            <Button.Backup
                loading={loading}
                fileSave={fileSave}
                handleBackup={handleBackup}
            />
        ),
    };

    return (
        <Portal.Login
            header={<Header.Senter />}
            form={
                <Form.Login
                    onSubmit={handleUserLogin}
                    field={field}
                    button={button}
                />
            }
        />
    );
}

export default LoginScreen;
