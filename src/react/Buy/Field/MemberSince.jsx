import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const MemberSince = ({ name, edit }) => (
    <Field
        name={name}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Member Since'
                className='TodayDate'
                placeholder='mm/dd/yyy'
                iconPosition='left'
                icon='calendar'
                disabled={edit}
                width={2}
                readOnly
                inverted
            />
        )}
    />
);

export default MemberSince;
