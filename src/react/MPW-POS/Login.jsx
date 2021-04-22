import Screen from './Screen';
import Header from './Header';
// import Form from './Form';
import Form from './Form/FormLogin';

// LOGIN SCREEN
export const Login = () => (
    <Screen name='login'>
        <Header title='Mckee Pure Water' content='User Login' />
        <Form />
    </Screen>
);

export default Login;
