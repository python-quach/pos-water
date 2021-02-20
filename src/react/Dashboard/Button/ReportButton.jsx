import { Button } from 'semantic-ui-react';
import { currentDate, currentTime } from '../../../helpers/helpers';
import { getDailyReport } from '../../../api/api';

const ReportButton = (props) => (
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
            getDailyReport(currentDate(), currentTime(), (data) => {
                console.log({ data });
            });
        }}
    />
);

export default ReportButton;
