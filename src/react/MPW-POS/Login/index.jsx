import Screen from './Screen';
import Header from './Header';
import Form from './Form';

// LOGIN
export const Login = ({ history }) => {
    return (
        <Screen open={history ? true : false}>
            <Header />
            <Form history={history} />
        </Screen>
    );
};

export default Login;
