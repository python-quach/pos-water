import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Record = (props) => (
    <Field
        name='record_id'
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Invoice'
                className='TodayDate'
                placeholder='xxxxxxx'
                icon='hashtag'
                iconPosition='left'
                readOnly
                inverted
                width={2}
            />
        )}
    />
);

export default Record;
