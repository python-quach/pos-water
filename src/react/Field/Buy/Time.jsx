import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Time = (props) => (
    <Field
        name='todayTime'
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
                width={2}
            />
        )}
    />
);

export default Time;
