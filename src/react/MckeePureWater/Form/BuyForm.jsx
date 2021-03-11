import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

const BuyForm = () => {
    return (
        <FinalForm
            onSubmit={(values) => {
                console.log('Buy Submit', values);
            }}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}>
                    <Form.Group>
                        <Field
                            name='date'
                            render={({ input }) => (
                                <Form.Input
                                    id='date'
                                    label='Today Date'
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='time'
                            render={({ input }) => (
                                <Form.Input
                                    id='time'
                                    label='Current Time'
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='memberSince'
                            render={({ input }) => (
                                <Form.Input
                                    id='memberSince'
                                    label='Member Since'
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='account'
                            render={({ input }) => (
                                <Form.Input
                                    id='account'
                                    label='Account'
                                    {...input}
                                />
                            )}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Field
                            name='areaCode'
                            render={({ input }) => (
                                <Form.Input
                                    id='areaCode'
                                    label='Area Code'
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
                                    {...input}
                                />
                            )}
                        />
                        <Field
                            name='fullname'
                            render={({ input }) => (
                                <Form.Input
                                    id='fullname'
                                    label='Customer Name'
                                    {...input}
                                />
                            )}
                        />
                        <Form.Button
                            primary
                            label='Actions'
                            onClick={(e) => {
                                e.preventDefault();
                            }}>
                            Edit
                        </Form.Button>
                        <Field
                            name='buy'
                            render={({ input }) => (
                                <Form.Input id='buy' label='Buy' {...input} />
                            )}
                        />
                        <Field
                            name='remain'
                            render={({ input }) => (
                                <Form.Input
                                    id='remain'
                                    label='Remain'
                                    {...input}
                                />
                            )}
                        />
                        <Form.Button positive label='Action'>
                            Buy
                        </Form.Button>
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
