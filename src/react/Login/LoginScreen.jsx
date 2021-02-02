import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { Form } from 'react-final-form';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const LoginScreen = ({ history, api }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');

    const onSubmit = async ({ password, username }) => {
        api.login({ username, password }, (auth) => {
            if (!auth) {
                setErrorMessage(true);
            } else {
                history.push({
                    pathname: '/dashboard',
                    state: { user_id: auth.user_id },
                });
            }
        });
    };

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <Grid
            textAlign='center'
            style={{ height: '100vh' }}
            verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <LoginHeader title='Mckee Pure Water' />
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ username: '', password: '' }}
                    render={({ handleSubmit, form, values }) => (
                        <LoginForm
                            form={form}
                            handleSubmit={handleSubmit}
                            values={values}
                            iconColor={iconColor}
                            errorMessage={errorMessage}
                            clear={setErrorMessage}
                        />
                    )}
                />
            </Grid.Column>
        </Grid>
    );
};

export default LoginScreen;
