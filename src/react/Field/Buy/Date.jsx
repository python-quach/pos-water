import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Date = (props) => (
    <Field
        name='todayDate'
        render={({ input }) => (
            <Form.Input
                {...input}
                id='todayDate'
                label='Today Date'
                className='TodayDate'
                inverted
                icon='calendar'
                placeholder='mm/dd/yyyy'
                iconPosition='left'
                readOnly
                width={2}
            />
        )}
    />
);

export default Date;
