import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Time = ({ edit }) => (
    <Field
        name='invoiceTime'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Current Time'
                className='TodayDate'
                inverted={true}
                placeholder='00:00:00 PM'
                icon='time'
                iconPosition='left'
                readOnly
                disabled={edit}
                width={2}
            />
        )}
    />
);

export default Time;
