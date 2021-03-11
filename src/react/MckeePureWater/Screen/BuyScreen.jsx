import { Segment, Header } from 'semantic-ui-react';
import BuyForm from '../Form/BuyForm';

const BuyScreen = (props) => {
    return (
        <Segment>
            <Header block size='huge' content='Buy Screen' />
            <BuyForm />
        </Segment>
    );
};

export default BuyScreen;
