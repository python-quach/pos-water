import { Form } from 'semantic-ui-react';

export const BackupButton = ({ file, loading, onClick }) => (
    <Form.Button
        content={file}
        type='button'
        className='LoginButton'
        color='pink'
        size='huge'
        icon='save'
        fluid
        circular
        loading={loading}
        onClick={onClick}
    />
);

export default BackupButton;
