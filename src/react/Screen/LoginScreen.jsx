import LoginPortal from '../Portal/Portal';
import LoginHeader from '../Header/StoreHeader';
import LoginForm from '../Form/LoginForm';

const LoginScreen = ({ history, api }) => (
    <LoginPortal>
        <LoginHeader title='Mckee Pure Water' content='User Login' />
        <LoginForm api={api} history={history} />
    </LoginPortal>
);

export default LoginScreen;
