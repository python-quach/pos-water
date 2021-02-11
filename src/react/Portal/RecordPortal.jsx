import { useEffect } from 'react';
import { TransitionablePortal, Segment } from 'semantic-ui-react';
import { dragElement } from '../../helpers/helpers';

const RecordPortal = ({ open, children }) => {
    useEffect(() => {
        if (open) dragElement(document.getElementById('invoices'));
    });

    return (
        <TransitionablePortal
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <div id='invoices'>
                <Segment>{children}</Segment>
            </div>
        </TransitionablePortal>
    );
};

export default RecordPortal;
