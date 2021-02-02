import { useState, useEffect } from 'react';
import { Grid, TransitionablePortal, Segment } from 'semantic-ui-react';
import { Form } from 'react-final-form';
import LoginHeader from '../Header/LoginHeader';
import LoginForm from '../Form/LoginForm';

const LoginScreen = ({ history, api }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const [iconColor, setIconColor] = useState('blueIcon');
    const [open, setOpen] = useState(true);

    useEffect(() => {
        errorMessage ? setIconColor('whiteIcon') : setIconColor('blueIcon');
    }, [errorMessage]);

    return (
        <TransitionablePortal
            onClose={() => setOpen(false)}
            open={open}
            transition={{ animation: 'zoom', duration: 500 }}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    style={{ height: '100vh' }}
                    verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <LoginHeader title='Mckee Pure Water' />
                        <Form
                            onSubmit={async ({ username, password }) => {
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
                            }}
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
            </Segment>
        </TransitionablePortal>
    );
};

export default LoginScreen;
