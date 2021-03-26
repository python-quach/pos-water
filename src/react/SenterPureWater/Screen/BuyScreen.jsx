import { useState } from 'react';
import {
    Segment,
    TransitionablePortal,
    Grid,
    Divider,
} from 'semantic-ui-react';
import BuyForm from '../Form/BuyForm';
import CustomerHistory from '../History/CustomerHistory';
import Receipt from '../Receipt';

const BuyScreen = (props) => {
    const [openReceipt, setOpenReceipt] = useState(true);
    const [openHistory, setOpenHistory] = useState(false);
    return (
        <TransitionablePortal
            open={props.open}
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
                        <Receipt open={openReceipt} record={props.record} />
                        <Divider />
                        <BuyForm
                            openReceipt={openReceipt}
                            setOpenReceipt={setOpenReceipt}
                            setOpenDashBoard={props.setOpenDashBoard}
                            setOpenBuyScreen={props.setOpenBuyScreen}
                            onSubmit={props.handleBuy}
                            record={props.record}
                            setRecord={props.setRecord}
                            setOpenHistory={setOpenHistory}
                            handleEdit={props.handleEdit}
                            openDelete={props.openDelete}
                            deleteAccount={props.deleteAccount}
                            setDeleteAccount={props.setDeleteAccount}
                            setOpenDelete={props.setOpenDelete}
                            setOpenDeleteConfirm={props.setOpenDeleteConfirm}
                            openDeleteConfirm={props.openDeleteConfirm}
                            setAdminPassword={props.setAdminPassword}
                            adminPassword={props.adminPassword}
                            handleDeleteMembership={
                                props.handleDeleteMembership
                            }
                        />
                        <CustomerHistory
                            record={props.record}
                            records={props.records}
                            open={openHistory}
                            setOpenBuyScreen={props.setOpenBuyScreen}
                            setOpenHistory={setOpenHistory}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default BuyScreen;
