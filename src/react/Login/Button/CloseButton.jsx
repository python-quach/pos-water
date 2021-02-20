import { useContext } from 'react';
import { LoginContext } from '../Screen/LoginScreen';
import { Button } from 'semantic-ui-react';

const CloseButton = () => {
    const { api } = useContext(LoginContext);

    return (
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
    );
};

export default CloseButton;
