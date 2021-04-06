import { useState, useEffect } from 'react';
import Portal from '../../Portal/Portal';
import { Header } from './Header';
import { Form } from './Form';
import { Button } from './Button';
import { Field } from './Field';
import { mckeeApi } from '../../../api/api';

export const LoginScreen = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState('Backup');
    const [errorMessage, setErrorMessage] = useState(false);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values) => {
        try {
            const result = await mckeeApi.login(values);
            history.push({ pathname: '/dashboard', state: { result } });
        } catch (err) {
            setVisible(false);
            setErrorMessage(err);
            setVisible(true);
            document.getElementById('username').focus();
            throw err;
        }
    };

    const backupDatabase = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await mckeeApi.backup();
            setFileSave(result.open);
            setLoading(false);
        } catch (err) {
            return console.log(err.message);
        }
    };

    const openAdminScreen = () =>
        history.push({ pathname: '/admin', state: { open: true } });

    useEffect(() => {
        return () => console.log('Login Screen clean up');
    }, []);

    return (
        <Portal open={history ? true : false}>
            <Header.Login title='Mckee Pure Water' content='Dashboard Login' />
            <Form.Login
                onSubmit={onSubmit}
                field={{
                    username: (
                        <Field.Username
                            className='blueIcon'
                            reset={() => setErrorMessage(false)}
                        />
                    ),
                    password: (
                        <Field.Password
                            className='blueIcon'
                            reset={() => setErrorMessage(false)}
                        />
                    ),
                }}
                button={{
                    login: ({ username, password }) => (
                        <Button.Login
                            disabled={!username || !password}
                            visible={visible}
                            errorMessage={errorMessage}
                        />
                    ),
                    admin: <Button.Admin onClick={openAdminScreen} />,
                    close: <Button.Close onClick={mckeeApi.closeApp} />,
                    backup: (
                        <Button.Backup
                            file={fileSave}
                            loading={loading}
                            onClick={backupDatabase}
                        />
                    ),
                }}
            />
        </Portal>
    );
};

export default LoginScreen;
