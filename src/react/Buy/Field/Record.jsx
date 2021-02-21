import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const Record = ({ name, edit }) => (
    <Field
        // name='record_id'
        name={name}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Invoice'
                className='TodayDate'
                placeholder='xxxxxxx'
                icon='hashtag'
                iconPosition='left'
                disabled={edit}
                readOnly
                inverted
                width={2}
            />
        )}
    />
);

export default Record;
