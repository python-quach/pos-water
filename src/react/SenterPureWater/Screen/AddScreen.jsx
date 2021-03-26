import {
    Segment,
    TransitionablePortal,
    Grid,
    Header,
    Icon,
    Divider,
} from 'semantic-ui-react';
import AddForm from '../Form/AddForm';

const AddScreen = (props) => {
    const { setOpenAdd, setOpenDashBoard, error, handleAddMembership } = props;

    const close = (e) => {
        e.preventDefault();
        setOpenAdd(false);
        setOpenDashBoard(true);
        props.setError(false);
    };

    const date = new Date();

    return (
        <TransitionablePortal open={props.open}>
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
