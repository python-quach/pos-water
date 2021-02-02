import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

const Portal = ({ children, open }) => {
    return (
        <TransitionablePortal
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
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
                        {children}
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default Portal;
