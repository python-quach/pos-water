import { Form } from 'semantic-ui-react';
import { currentDate } from '../../../../helpers/helpers';

const ReportButton = ({ onClick }) => (
    <Form.Button
        id='ReportButton'
        type='button'
        color='yellow'
        size='huge'
        icon='file outline'
        labelPosition='right'
        content={`Daily Report: ${currentDate()}`}
        circular
        fluid
        onClick={onClick}
    />
);

export default ReportButton;
