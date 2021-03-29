import { useState } from 'react';
import {
    Segment,
    TransitionablePortal,
    Grid,
    Header,
    Icon,
    Divider,
} from 'semantic-ui-react';
import AddForm from '../Form/AddForm';
import { add } from '../Api';

const AddScreen = (props) => {
    const [error, setError] = useState(false);

    const close = (e) => {
        e.preventDefault();
        props.history.push('/dashboard');
    };

    const date = new Date();

    const handleAddMembership = async (values) => {
        try {
            const data = await add(values);
            props.history.push({ pathname: '/buy', state: data });
        } catch (err) {
            setError(err);
            document.getElementById('account').focus();
        }
    };

    return (
        <TransitionablePortal open={props.location.state.open}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid verticalAlign='top' style={{ height: '100vh' }}>
                    <Grid.Column>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Senter Pure Water
                                <Header.Subheader content='Last Purchase Receipt' />
                            </Header.Content>
                        </Header>
                        <Divider hidden />
                        <Divider hidden />
                        <AddForm
                            onSubmit={handleAddMembership}
                            error={error}
                            close={close}
                            date={date}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default AddScreen;
