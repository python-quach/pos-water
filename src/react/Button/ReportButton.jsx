import { Button, Divider } from 'semantic-ui-react';
import { currentDate } from '../../helpers/helpers';

const ReportButton = (props) => (
    <>
        <Divider hidden />
        <Button
            color='yellow'
            circular={true}
            fluid={true}
            size='huge'
            id='ReportButton'
            icon='file outline'
            labelPosition='right'
            content={`Daily Report: ${currentDate()}`}
            onClick={() => {
                console.log('Daily Sales Report', currentDate());
                // getDailyReport(currentDate(), getCurrentTime(), (data) => {
                //     console.log({ data });
                // });
            }}
        />
    </>
);

export default ReportButton;
