import { useContext } from 'react';
import { LoginContext } from '../Screen/LoginScreen';
import { Button } from 'semantic-ui-react';

const BackupButton = () => {
    const { api, handle, state } = useContext(LoginContext);
    return (
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
    );
};

export default BackupButton;
