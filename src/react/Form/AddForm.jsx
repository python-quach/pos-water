import { Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

const AddForm = ({ api, state, history, initialValues, onSubmit }) => {
    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, values, initialValues }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() => {});
                        }}>
                        <Form.Group>
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
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='invoiceTime'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        label='Current Time'
                                        className='TodayDate'
                                        placeholder='00:00:00 PM'
                                        icon='time'
                                        iconPosition='left'
                                        inverted
                                        readOnly
                                        width={2}
                                    />
                                )}
                            />
                            <Form.Input type='hidden' width={8} />

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
                                        width={2}
                                        readOnly
                                        inverted
                                    />
                                )}
                            />
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
                        </Form.Group>
                        <Form.Group>
                            <Field
                                name='account'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length < 10)
                                        return parseInt(onlyNums);
                                    return parseInt(onlyNums.slice(0, 9));
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='account'
                                        label='Account'
                                        className='BuyAccount'
                                        placeholder='xxxxxx'
                                        icon='hashtag'
                                        iconPosition='left'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='areaCode'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length < 3)
                                        return parseInt(onlyNums);
                                    return parseInt(onlyNums.slice(0, 3));
                                }}
                                render={({ input, meta }) => (
                                    <Form.Input
                                        {...input}
                                        id='areaCode'
                                        className='AreaCode'
                                        label='Area Code'
                                        inverted
                                        placeholder='xxx'
                                        width={1}
                                    />
                                )}
                            />
                            <Field
                                name='phone'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length <= 6) return onlyNums;
                                    return `${onlyNums.slice(
                                        0,
                                        3
                                    )}-${onlyNums.slice(3, 7)}`;
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='phone'
                                        className='PhoneNumber'
                                        label='Phone Number'
                                        placeholder='xxx-xxxx'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='firstName'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyWords = value.replace(
                                        /[^A-Za-z]/g,
                                        ''
                                    );
                                    return onlyWords.toUpperCase();
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='firstName'
                                        label='First Name'
                                        placeholder='First Name'
                                        className='Name'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='lastName'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyWords = value.replace(
                                        /[^A-Za-z]/g,
                                        ''
                                    );
                                    return onlyWords.toUpperCase();
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='lastName'
                                        label='Last Name'
                                        placeholder='Last Name'
                                        className='Name'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Form.Input type='hidden' width={3} />

                            <Field
                                name='fee'
                                parse={(value) => {
                                    if (!value) return 0;

                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );

                                    if (onlyNums.length < 5) {
                                        return parseInt(onlyNums);
                                    } else {
                                        return parseInt(
                                            onlyNums.substring(
                                                0,
                                                onlyNums.length - 1
                                            )
                                        );
                                    }
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='renew'
                                        label='Fee'
                                        className='AreaCode'
                                        inverted
                                        width={1}
                                    />
                                )}
                            />
                            <Field
                                name='renew'
                                parse={(value) => {
                                    if (!value) return 0;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );

                                    if (onlyNums.length < 5) {
                                        return parseInt(onlyNums);
                                    } else {
                                        return parseInt(
                                            onlyNums.substring(
                                                0,
                                                onlyNums.length - 1
                                            )
                                        );
                                    }
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        label='Gallon'
                                        className='AreaCode'
                                        inverted={true}
                                        width={1}
                                    />
                                )}
                            />
                            <Form.Button
                                type='submit'
                                content='Add'
                                color='facebook'
                                style={{ marginTop: '30px', width: '80px' }}
                                disabled={
                                    !values.fee ||
                                    !values.renew ||
                                    !values.firstName ||
                                    !values.lastName ||
                                    !values.phone ||
                                    !values.areaCode ||
                                    !values.account
                                }
                            />
                            <Form.Button
                                type='submit'
                                content='Done'
                                style={{ marginTop: '30px', width: '80px' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/dashboard');
                                }}
                            />
                        </Form.Group>
                        <pre style={{ color: 'white' }}>
                            {JSON.stringify({ initialValues, values }, null, 2)}
                        </pre>
                    </Form>
                )}
            />
        </>
    );
};

export default AddForm;
