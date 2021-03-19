import {
    Segment,
    Header,
    Icon,
    TransitionablePortal,
    Grid,
    Divider,
} from 'semantic-ui-react';
import FindForm from '../Form/FindForm';

const DashBoardScreen = (props) => {
    return (
        <TransitionablePortal
            open={props.open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <Segment
                raised
                clearing
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    style={{ height: '100vh' }}>
                    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Senter Pure Water
                                <Header.Subheader content='Dashboard' />
                            </Header.Content>
                        </Header>
                        <Divider />
                        <Divider hidden />
                        <FindForm
                            // find={props.handleFindMembership}
                            setOpenAdd={props.setOpenAdd}
                            setOpenDashBoard={props.setOpenDashBoard}
                            setOpenLogin={props.setOpenLogin}
                            // onSubmit={handleFindMembership}
                            onSubmit={props.handleFindMembership}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default DashBoardScreen;
