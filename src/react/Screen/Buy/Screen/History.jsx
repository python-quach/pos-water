import {
    TransitionablePortal,
    Segment,
    Header,
    Button,
} from 'semantic-ui-react';

export const History = ({
    open,
    data,
    totalFee,
    totalRenew,
    totalBuy,
    children,
}) => (
    <TransitionablePortal
        open={open}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}>
        <div id='invoices'>
            <Segment>
                <Header>{data ? data.fullname : ''} Record History</Header>
                <Button
                    color='red'
                    content='Total Fee'
                    icon='dollar'
                    label={{
                        basic: true,
                        color: 'red',
                        pointing: 'left',
                        content: totalFee,
                    }}
                />
                <Button
                    color='blue'
                    content='Total Renew'
                    icon='tint'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'blue',
                        pointing: 'left',
                        content: totalRenew,
                    }}
                />
                <Button
                    color='green'
                    content='Total Buy'
                    icon='cart'
                    label={{
                        as: 'a',
                        basic: true,
                        color: 'green',
                        pointing: 'left',
                        content: totalBuy,
                    }}
                />
                {children}
            </Segment>
        </div>
    </TransitionablePortal>
);
