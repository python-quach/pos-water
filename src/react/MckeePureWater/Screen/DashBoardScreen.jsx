import { Segment, Header } from 'semantic-ui-react';
import FindForm from '../Form/FindForm';

const handleFindMembership = async (values) => {
    console.log('handleFindMembership', values);
};

const DashBoardScreen = () => (
    <Segment raised clearing>
        <Header size='huge' block>
            DashBoard Screen
        </Header>
        <FindForm onSubmit={handleFindMembership} />
    </Segment>
);

export default DashBoardScreen;
