import { Segment, Header } from 'semantic-ui-react';
import LoginForm from '../Form/LoginForm';

const onSubmit = async (values) => {
    console.log('Login:', values);
};

const LoginScreen = () => {
    return (
        <Segment raised>
            <Header size='huge' block>
                Login Screen
            </Header>
            <LoginForm onSubmit={onSubmit} />
        </Segment>
    );
};

export default LoginScreen;
