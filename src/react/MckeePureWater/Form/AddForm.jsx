import { Form as FinalForm, Field, FormSpy } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
    await sleep(300);
    console.log('Add New Membership: ', values);
};

const AddForm = (props) => (
    <FinalForm
        onSubmit={onSubmit}
        initialValues={{
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            fee: 0,
            gallon: 0,
            record: props.newRecord,
        }}
        render={({ handleSubmit, form, submitting }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event);
                }}>
                <Form.Group>
                    <Field
                        name='record'
                        render={({ input }) => (
                            <Form.Input
                                id='record'
                                label='Record #'
                                placeholder='xxxxxxx'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='date'
                        render={({ input }) => (
                            <Form.Input
                                id='data'
                                label='Date'
                                placeholder='mm/dd/yyyy'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='time'
                        render={({ input }) => (
                            <Form.Input
                                id='time'
                                label='Time'
                                placeholder='xx:xx:xx'
                                {...input}
                            />
                        )}
                    />
                </Form.Group>
                <Form.Group>
                    <Field
                        name='account'
                        render={({ input }) => (
                            <Form.Input
                                id='account'
                                label='Account'
                                placeholder='xxxxxxx'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='areaCode'
                        render={({ input }) => (
                            <Form.Input
                                id='areaCode'
                                label='Area Code'
                                placeholder='xxx'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='phone'
                        render={({ input }) => (
                            <Form.Input
                                id='phone'
                                label='Phone Number'
                                placeholder='xxx-xxxx'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='firstName'
                        render={({ input }) => (
                            <Form.Input
                                id='firstName'
                                label='First Name'
                                placeholder='Enter First Name'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='lastName'
                        render={({ input }) => (
                            <Form.Input
                                id='lastName'
                                label='Last Name'
                                placeholder='Enter Last Name'
                                {...input}
                            />
                        )}
                    />
                    <Field
                        name='fee'
                        render={({ input }) => (
                            <Form.Input id='fee' label='Fee' {...input} />
                        )}
                    />
                    <Field
                        name='gallon'
                        render={({ input }) => (
                            <Form.Input id='gallon' label='Gallon' {...input} />
                        )}
                    />
                </Form.Group>
                <Button.Group>
                    <Button
                        type='submit'
                        loading={submitting}
                        disabled={submitting}
                        primary
                        content='Add'
                    />
                    <Button.Or />
                    <Button content='Cancel' negative />
                </Button.Group>
                {/* <FormSpy>
                    {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                </FormSpy> */}
            </Form>
        )}
    />
);

export default AddForm;
