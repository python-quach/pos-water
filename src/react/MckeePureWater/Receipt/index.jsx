import { TransitionablePortal, Segment, Grid, Table } from 'semantic-ui-react';
import BuyReceipt from '../Receipt/BuyReceipt';
import NewReceipt from '../Receipt/NewReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';

const Receipt = ({ record, open }) => {
    console.log('RECEIPT: ', record);

    return (
        <TransitionablePortal
            transition={{ animation: 'vertical flip', duration: 500 }}
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <Segment
                style={{
                    margin: 0,
                    left: '0%',
                    right: '0%',
                    top: '0%',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid>
                    <Grid.Column>
                        <Table celled inverted selectable color='blue'>
                            {record.type === 'NEW' && (
                                <NewReceipt record={record} />
                            )}
                            {record.type === 'BUY' && (
                                <BuyReceipt record={record} />
                            )}
                            {record.type === 'RENEW' && (
                                <RenewReceipt record={record} />
                            )}
                        </Table>
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default Receipt;
