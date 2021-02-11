import { useEffect } from 'react';
import { TransitionablePortal, Segment, Header } from 'semantic-ui-react';
import Record from '../Record/Record';
import { dragElement } from '../../helpers/helpers';

const RecordPortal = ({ records, open, totalPages, onChange, activePage }) => {
    console.log(records);

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
                <Segment>
                    <Header>Customer Record History</Header>
                    <Record
                        records={records}
                        totalPages={totalPages}
                        onChange={onChange}
                        activePage={activePage}
                    />
                </Segment>
            </div>
        </TransitionablePortal>
    );
};

export default RecordPortal;
