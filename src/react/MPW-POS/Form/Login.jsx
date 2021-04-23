import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import Button from '../Button';
import Field from '../Field';

export const LoginForm = () => {
    const {
        component,
        helpers,
        send,
        channels,
        setLoading,
        setFileSave,
    } = useContext(StoreContext);
    const {
        onSubmit,
        open,
        input: { username, password },
        button: { login, admin, close, backup },
    } = component.login;

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name={username} reset={helpers.field.resetError} />
                    <Field name={password} reset={helpers.field.resetError} />
                    <Divider hidden />
                    <Button.Pulse
                        render={login}
                        onClick={(setVisible) => {
                            setVisible((visible) => !visible);
                        }}
                    />
                    <Button.Pulse
                        render={admin}
                        onClick={(setVisible) => {
                            setVisible((visible) => !visible);
                            open.admin();
                        }}
                    />
                    <Form.Group widths={2}>
                        <Button.Pulse
                            render={close}
                            onClick={async (setVisible) => {
                                setVisible((visible) => !visible);
                                await helpers.sleep(500);
                                send(channels.CLOSE_APP);
                            }}
                        />
                        <Button.Pulse
                            render={backup}
                            onClick={async (setVisible) => {
                                setVisible((visible) => !visible);
                                await helpers.sleep(500);
                                try {
                                    setLoading(true);
                                    setFileSave(
                                        await send(channels.SHOW_BACKUP_DIALOG)
                                    );
                                    setLoading(false);
                                } catch (err) {
                                    setLoading(false);
                                    setFileSave(err);
                                }
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default LoginForm;
