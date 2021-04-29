import Portal from '../Portal/LoginPortal';
import Header from '../Header/LoginHeader';
import Form from '../Form/LoginForm';

export const LoginScreen = ({ history }) => (
    <Portal open={history ? true : false}>
        <Header title='Mckee Pure Water' content='User Login' />
        <Form />
    </Portal>
);

export default LoginScreen;
