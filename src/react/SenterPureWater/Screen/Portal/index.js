import {
    TransitionablePortal,
    Segment,
    Grid,
    Divider,
} from 'semantic-ui-react';

export const LoginPortal = ({
    segment,
    portalSetting,
    grid,
    column,
    form,
    header,
}) => (
    <TransitionablePortal {...portalSetting} open={true}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column {...column}>
                    {header}
                    <Divider />
                    {form}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

LoginPortal.defaultProps = {
    segment: {
        raised: true,
        style: {
            margin: 0,
            height: '100%',
            overflow: 'hidden',
            zIndex: 1000,
            backgroundColor: '#002b487d',
        },
    },
    grid: {
        textAlign: 'center',
        verticalAlign: 'middle',
        style: {
            height: '100vh',
        },
    },
    column: {
        style: { maxWidth: 450 },
    },
    header: {
        as: 'h1',
        inverted: true,
        size: 'huge',
        textAlign: 'left',
    },
    icon: {
        name: 'braille',
        color: 'blue',
    },
    portalSetting: {
        closeOnDocumentClick: false,
        closeOnEscape: false,
        closeOnDimmerClick: false,
        closeOnPortalMouseLeave: false,
    },
    content: 'Senter Pure Water',
    version: 'Dashboard Version 2.0.5',
};

export const DashBoardPortal = ({ open, header, form }) => (
    <TransitionablePortal
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}
        open={open}>
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
                verticalAlign='middle'
                style={{ height: '100vh' }}>
                <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                    {header}
                    <Divider />
                    <Divider hidden />
                    {form}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

export const AddPortal = ({ open, header, form }) => (
    <TransitionablePortal open={open}>
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
                    {header}
                    <Divider hidden />
                    <Divider hidden />
                    {form}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

export const AccountPortal = ({ open, header, table }) => (
    <TransitionablePortal
        open={open}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}>
        <Segment
            raised
            style={{
                height: '100vh',
                overflow: 'scroll',
                backgroundColor: '#002b487d',
            }}>
            {header}
            {table}
        </Segment>
    </TransitionablePortal>
);

export const BuyPortal = ({ open, receipt, form, history }) => (
    <TransitionablePortal
        open={open}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}>
        <Segment
            style={{
                margin: 0,
                height: '100%',
                overflow: 'hidden',
                zIndex: 1000,
                backgroundColor: '#002b487d',
            }}>
            <Grid
                verticalAlign='top'
                style={{ height: '100vh', backgroundColor: '#002b487d' }}>
                <Grid.Column
                    style={{
                        backgroundColor: '#002b487d',
                    }}>
                    {receipt}
                    <Divider />
                    {form}
                    {history}
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

const DefaultPortal = {
    Login: LoginPortal,
    DashBoard: DashBoardPortal,
    Add: AddPortal,
    Account: AccountPortal,
    Buy: BuyPortal,
};

export default DefaultPortal;
