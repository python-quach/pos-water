import { Form } from 'semantic-ui-react';

export const LoginButton = ({ error }) => (
    <Form.Button
        content={error ? 'Invalid Credential' : 'Login'}
        icon={error ? 'warning' : 'lock'}
        negative={error ? true : false}
        labelPosition='right'
        size='huge'
        circular
        fluid
        primary
    />
);

export const CloseButton = ({ closeApp }) => (
    <Form.Button
        circular
        fluid
        size='huge'
        content='Close'
        icon='close'
        labelPosition='right'
        color='black'
        onClick={(e) => {
            e.preventDefault();
            console.log('Close');
            closeApp();
        }}
    />
);

export const BackupButton = ({ loading, fileSave, backup }) => (
    <Form.Button
        loading={loading}
        circular
        size='huge'
        content={fileSave ? fileSave : 'Backup'}
        icon='database'
        color='pink'
        fluid
        onClick={(e) => {
            e.preventDefault();
            console.log('Backup');
            backup();
        }}
    />
);

const Button = {
    Login: LoginButton,
    Close: CloseButton,
    Backup: BackupButton,
};

export default Button;
