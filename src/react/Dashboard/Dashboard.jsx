import { useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Divider,
    Header,
    Icon,
    Button,
    Grid,
} from 'semantic-ui-react';
import FindForm from '../Form/FindForm';

const DashBoardScreen = (props) => {
    const user_id = props.location.state ? props.location.state.user_id : false;
    const [open, setOpen] = useState(user_id ? true : false);

    return (
        <TransitionablePortal
            onClose={() => setOpen(false)}
            open={open}
            transition={{ animation: 'vertical flip', duration: 500 }}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    style={{ height: '100vh' }}
                    verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Mckee Pure Water
                                <Header.Subheader>Version 1.0</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Button
                            content='Back'
                            onClick={() => props.history.push('/')}
                        />
                        <Divider />
                        <FindForm />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default DashBoardScreen;
