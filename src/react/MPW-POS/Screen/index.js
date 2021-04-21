import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';

export const Screen = ({ children, name }) => {
    const { history, screen } = useContext(StoreContext);
    const { close, segment, grid, width } = screen[name];
    return (
        <TransitionablePortal open={history ? true : false} {...close}>
            <Segment {...segment}>
                <Grid {...grid}>
                    <Grid.Column {...width}>{children}</Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default Screen;
