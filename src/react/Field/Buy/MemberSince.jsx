import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const MemberSince = (props) => (
    <Field
        name='memberSince'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Member Since'
                className='TodayDate'
                placeholder='mm/dd/yyy'
                iconPosition='left'
                icon='calendar'
                readOnly
                inverted
                width={2}
            />
        )}
    />
);

export default MemberSince;
