import { Segment, Header } from 'semantic-ui-react';
import FindForm from '../Form/FindForm';

const handleFindMembership = async (values) => {
    console.log('handleFindMembership', values);
};

const DashBoardScreen = (props) => {
    return (
        <Segment raised clearing>
            <Header size='huge' block>
                DashBoard Screen
            </Header>
            <FindForm
                setOpenDashBoard={props.setOpenDashBoard}
                setOpenLogin={props.setOpenLogin}
                onSubmit={handleFindMembership}
            />
        </Segment>
    );
};

export default DashBoardScreen;
