import { Segment, TransitionablePortal, Grid } from 'semantic-ui-react';
import BuyForm from '../Form/BuyForm';

const BuyScreen = (props) => {
    return (
        // <TransitionablePortal open={true}>
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
                        <BuyForm
                            onSubmit={props.handleBuy}
                            record={props.record}
                            setRecord={props.setRecord}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default BuyScreen;
