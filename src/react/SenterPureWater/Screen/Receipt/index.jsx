import {
    TransitionablePortal,
    Segment,
    Grid,
    Table,
    Header,
    Icon,
    Divider,
} from 'semantic-ui-react';
import BuyReceipt from './BuyReceipt';
import NewReceipt from './NewReceipt';
import RenewReceipt from './RenewReceipt';

const Receipt = ({ record, open }) => {
    return (
        <TransitionablePortal
            style={{
                backgroundColor: '#002b487d',
            }}
            transition={{ animation: 'vertical flip', duration: 700 }}
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <Segment
                style={{
                    // margin: 15,
                    paddingRight: 18,
                    paddingLeft: 18,
                    paddingTop: 20,
                    left: '0%',
                    right: '0%',
                    top: '0%',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    style={{
                        backgroundColor: '#002b487d',
                    }}>
                    <Grid.Column style={{ backgroundColor: '#002b487d' }}>
                        <Header as='h1' inverted size='huge' textAlign='left'>
                            <Icon name='braille' color='blue' />
                            <Header.Content>
                                Senter Pure Water
                                <Header.Subheader content='Last Purchase Receipt' />
                            </Header.Content>
                        </Header>
                        <Divider hidden />
                        <Divider hidden />
                        <Table celled inverted selectable color='blue'>
                            {record.type === 'NEW' && (
                                <NewReceipt
                                    record={record}
                                    setOpen={() => {}}
                                />
                            )}
                            {record.type === 'BUY' && (
                                <BuyReceipt
                                    record={record}
                                    setOpen={() => {}}
                                />
                            )}
                            {record.type === 'RENEW' && (
                                <RenewReceipt
                                    record={record}
                                    setOpen={() => {}}
                                />
                            )}
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default Receipt;
