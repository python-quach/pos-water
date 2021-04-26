import { TransitionablePortal, Segment, Grid } from 'semantic-ui-react';

export const Screen = ({
    children,
    screen: { close, segment, grid, width, open },
}) => (
    <TransitionablePortal open={open} {...close}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column {...width}>{children}</Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

export default Screen;
