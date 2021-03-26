import { useEffect } from 'react';
import { Header, Icon, Divider } from 'semantic-ui-react';
import Portal from '../../Portal/Portal';
import { AddPortalConfig as config } from '../../../config/portal';
import AddForm from '../Form/AddForm';

const AddScreen = (props) => {
    console.log('CHECK ME OUT ADDSCREEN:', props);
    const { history, api } = props;
    const record = history.location.state;

    useEffect(() => {
        if (!record) history.push('/dashboard');
    });

    useEffect(() => {
        document.getElementById('account').focus();
    }, []);

    return (
        <Portal {...config}>
            <Header as='h1' inverted size='huge' textAlign='left'>
                <Icon name='braille' color='blue' />
                <Header.Content>
                    Mckee Pure Water
                    <Header.Subheader content='New Membership' />
                </Header.Content>
            </Header>
            <Divider hidden />
            <Divider hidden />
            <AddForm api={api} history={history} record={record} />
        </Portal>
    );
};

export default AddScreen;
