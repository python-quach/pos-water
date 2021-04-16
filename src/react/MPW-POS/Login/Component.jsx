import Field from './Field';
import Button from './Button';

export const LoginFormField = {
    username: <Field.Username />,
    password: <Field.Password />,
};

export const LoginFormButton = {
    login: <Button.Login />,
    admin: <Button.Admin />,
    close: <Button.Close />,
    backup: <Button.Backup />,
};

export const Component = {
    LoginFormField,
    LoginFormButton,
};

export const Form = {
    Field: LoginFormField,
    Button: LoginFormButton,
};

export default Component;
