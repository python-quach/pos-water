// import { Field } from 'final-form';
import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const InvoiceDate = ({ width }) => {
    return (
        <Field
            name='invoiceDate'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='todayDate'
                    label='Today Date'
                    className='TodayDate'
                    placeholder='mm/dd/yyyy'
                    icon='calendar'
                    iconPosition='left'
                    inverted
                    readOnly
                    width={width}
                />
            )}
        />
    );
};

export default InvoiceDate;
