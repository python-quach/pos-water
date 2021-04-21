import Screen from '../Screen';
import Header from '../Header';
import Form from '../Form';

// LOGIN SCREEN
export const Login = () => (
    <Screen name='login'>
        <Header title='Mckee Pure Water' content='User Login' />
        <Form.Login />
    </Screen>
);

export default Login;
