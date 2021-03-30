import { Form } from 'semantic-ui-react';

export const LoginButton = ({ error }) => (
    <Form.Button
        content={error ? error : 'Login'}
        size='huge'
        icon={error ? 'warning' : 'lock'}
        negative={error ? true : false}
        labelPosition='right'
        circular
        fluid
        primary
    />
);

export const CloseButton = ({ closeApp }) => (
    <Form.Button
        content='Close'
        size='huge'
        circular
        fluid
        icon='close'
        labelPosition='right'
        color='black'
        onClick={closeApp}
    />
);

export const BackupButton = ({ loading, fileSave, handleBackup }) => (
    <Form.Button
        content={fileSave ? fileSave : 'Backup'}
        size='huge'
        icon='database'
        color='pink'
        circular
        fluid
        loading={loading}
        onClick={handleBackup}
    />
);

export const FindButton = ({ values }) => (
    <Form.Button
        disabled={
            (!values.phone || values.phone.length < 14) &&
            !values.account &&
            !values.first &&
            !values.last
        }
        content='Find Membership'
        primary
        circular
        fluid
        icon='search'
        labelPosition='right'
        size='huge'
    />
);

export const NewMemberButton = ({ add }) => (
    <Form.Button
        content='New Membership'
        color='teal'
        circular
        fluid
        icon='plus circle'
        labelPosition='right'
        size='huge'
        onClick={add}
    />
);

export const DailyReportButton = ({ report }) => (
    <Form.Button
        content={`Daily Report ${new Date().toDateString()}`}
        type='button'
        color='yellow'
        circular
        icon='file'
        labelPosition='right'
        size='huge'
        fluid
        onClick={report}
    />
);

export const LogoutButton = ({ logout }) => (
    <Form.Button
        content='Logout'
        color='black'
        size='huge'
        fluid
        circular
        icon='sign-out'
        labelPosition='right'
        type='button'
        onClick={logout}
    />
);

export const AddButton = ({ values, submitting }) => (
    <Form.Button
        disabled={
            !values.phone ||
            values.phone.length < 14 ||
            !values.account ||
            !values.first ||
            !values.last ||
            !values.fee ||
            !values.gallon ||
            submitting
        }
        type='submit'
        loading={submitting}
        primary
        fluid
        style={{ marginTop: '30px' }}
        size='huge'
        content='Add'
    />
);

export const CancelButton = ({ close }) => (
    <Form.Button
        content='Cancel'
        style={{ marginTop: '30px' }}
        size='huge'
        fluid
        negative
        onClick={close}
    />
);

const Button = {
    Login: LoginButton,
    Close: CloseButton,
    Backup: BackupButton,
    Find: FindButton,
    Add: NewMemberButton,
    Report: DailyReportButton,
    Logout: LogoutButton,
    New: AddButton,
    Cancel: CancelButton,
};

export default Button;
