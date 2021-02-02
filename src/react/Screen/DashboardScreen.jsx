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

const DashBoardScreen = ({ api, history }) => {
    const [open, setOpen] = useState(true);

    return (
        <TransitionablePortal
            onClose={() => setOpen(false)}
            open={open}
            transition={{ animation: 'zoom', duration: 500 }}>
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
                            onClick={() => history.push('/')}
                        />
                        <Divider />
                        <FindForm
                            api={api}
                            history={history}
                            setOpen={setOpen}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default DashBoardScreen;
