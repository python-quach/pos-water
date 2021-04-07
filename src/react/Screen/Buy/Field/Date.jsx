import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Date = ({ name, edit }) => (
    <Field
        name={name}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='todayDate'
                label='Today Date'
                className='TodayDate'
                placeholder='mm/dd/yyyy'
                icon='calendar'
                iconPosition='left'
                disabled={edit}
                width={2}
                inverted
                readOnly
            />
        )}
    />
);

export default Date;
