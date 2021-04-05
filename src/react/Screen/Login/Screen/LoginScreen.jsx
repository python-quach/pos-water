import { useState, useEffect } from 'react';
import Portal from '../Portal';
import Header from '../Header/LoginHeader';
import LoginForm from '../Form/LoginForm';
import { Button } from '../Button';
import { Field } from '../Field';
import { mckeeApi } from '../../../../api/api';

export const LoginScreen = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [fileSave, setFileSave] = useState('Backup');
    const [iconColor, setIconColor] = useState('blueIcon');
    const [errorMessage, setErrorMessage] = useState(false);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values) => {
        console.log('onSubmit Kaka', values);
        try {
            const result = await mckeeApi.backup();
            console.log(result);
            setErrorMessage(false);
        } catch (err) {
            setErrorMessage((err) => {
                setVisible(true);
                document.getElementById('username').focus();
                return err;
            });
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
        if (errorMessage) setVisible(true);
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
        setVisible(false);
    }, [errorMessage]);

    useEffect(() => {
        return () => console.log('Login Screen clean up');
    }, []);

    return (
        <Portal open={history ? true : false}>
            <Header title='Mckee Pure Water' content='User Login' />
            <LoginForm
                onSubmit={onSubmit}
                field={{
                    username: <Field.Username className={iconColor} />,
                    password: <Field.Password className={iconColor} />,
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
