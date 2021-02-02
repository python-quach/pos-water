import { useState, useEffect } from 'react';
import LoginPortal from '../Portal/Portal';
import LoginHeader from '../Header/StoreHeader';
import LoginForm from '../Form/LoginForm';
import ReportButton from '../Button/ReportButton';
const LoginScreen = ({ history, api }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <LoginPortal open={true}>
            <LoginHeader title='Mckee Pure Water' />
            <LoginForm
                api={api}
                history={history}
                iconColor={iconColor}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <ReportButton />
        </LoginPortal>
    );
};

export default LoginScreen;
