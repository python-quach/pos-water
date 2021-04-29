import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../../store';

export const PurchaseScreen = ({ children }) => {
    const { history } = useContext(StoreContext);

    useEffect(() => {
        if (!history.location.state) history.push('/dashboard');
    });

    return (
        <TransitionablePortal
            open={history.location.state ? true : false}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <Segment
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid style={{ height: '100vh' }}>
                    <Grid.Column>
                        {children}
                        <pre>
                            {JSON.stringify(history.location.state, 0, 2)}
                        </pre>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default PurchaseScreen;
