import { TransitionablePortal, Segment, Header } from 'semantic-ui-react';

const ReceiptPortal = ({ openReceipt, children }) => {
    return (
        <TransitionablePortal
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
            transition={{ animation: 'fade', duration: 500 }}
            open={openReceipt}>
            <Segment
                style={{
                    left: '2%',
                    position: 'fixed',
                    top: '33%',
                    zIndex: 1000,
                }}>
                <Header>Receipt</Header>
                {children}
            </Segment>
        </TransitionablePortal>
    );
};

export default ReceiptPortal;
