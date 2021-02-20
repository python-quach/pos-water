import { useContext } from 'react';
import { Form, Divider, Button } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Username from '../Field/Login/Username';
import Password from '../Field/Login/Password';
import LoginButton from '../Button/LoginButton';
import { api } from '../../api/api';
import { LoginContext } from '../Screen/LoginScreen';

const LoginForm = () => {
    const { state, handle } = useContext(LoginContext);
    return (
        <FinalForm
            onSubmit={handle.login}
            initialValues={{ username: '', password: '' }}
            render={({
                handleSubmit,
                form,
                values: { username, password },
            }) => (
                <Form
                    size='large'
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Username />
                    <Password />
                    <Divider hidden />
                    <LoginButton
                        errorMessage={state.errorMessage}
                        username={username}
                        password={password}
                        form={form}
                        clear={handle.errorMessage}
                    />
                    <Form.Group>
                        <Button
                            className='LoginButton'
                            circular
                            fluid={true}
                            size='huge'
                            color='black'
                            icon='close'
                            labelPosition='right'
                            content='Close'
                            onClick={(e) => {
                                e.preventDefault();
                                api.closeApp();
                            }}
                        />
                        <Button
                            className='LoginButton'
                            circular
                            fluid={true}
                            size='huge'
                            color='pink'
                            icon='save'
                            labelPosition='right'
                            content='Backup'
                            loading={state.save}
                            onClick={(e) => {
                                e.preventDefault();
                                handle.save(true);
                                api.backup((response) => {
                                    console.log(response);
                                    handle.save(false);
                                });
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
        // <FinalForm
        //     onSubmit={handle.login}
        //     initialValues={{ username: '', password: '' }}
        //     render={({
        //         handleSubmit,
        //         form,
        //         values: { username, password },
        //     }) => (
        //         <Form
        //             size='large'
        //             onSubmit={(event) => {
        //                 handleSubmit(event).then(form.reset);
        //             }}>
        //             <Username
        //                 iconColor={state.iconColor}
        //                 clear={handle.errorMessage}
        //             />
        //             <Password
        //                 iconColor={state.iconColor}
        //                 clear={handle.errorMessage}
        //             />
        //             <Divider hidden />
        //             <LoginButton
        //                 errorMessage={state.errorMessage}
        //                 username={username}
        //                 password={password}
        //                 form={form}
        //                 clear={handle.errorMessage}
        //             />
        //             <Form.Group>
        //                 <Button
        //                     className='LoginButton'
        //                     circular
        //                     fluid={true}
        //                     size='huge'
        //                     color='black'
        //                     icon='close'
        //                     labelPosition='right'
        //                     content='Close'
        //                     onClick={(e) => {
        //                         e.preventDefault();
        //                         api.closeApp();
        //                     }}
        //                 />
        //                 <Button
        //                     className='LoginButton'
        //                     circular
        //                     fluid={true}
        //                     size='huge'
        //                     color='pink'
        //                     icon='save'
        //                     labelPosition='right'
        //                     content='Backup'
        //                     loading={state.save}
        //                     onClick={(e) => {
        //                         e.preventDefault();
        //                         handle.save(true);
        //                         api.backup((response) => {
        //                             console.log(response);
        //                             handle.save(false);
        //                         });
        //                     }}
        //                 />
        //             </Form.Group>
        //         </Form>
        //     )}
        // />
    );
};

export default LoginForm;
