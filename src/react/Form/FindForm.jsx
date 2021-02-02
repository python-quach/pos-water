import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Phone from '../Field/Phone';
import Account from '../Field/Account';
import FirstName from '../Field/FirstName';
import LastName from '../Field/LastName';

const FindForm = ({ api, history }) => {
    const onSubmit = async ({ phone, account, firstName, lastName }) => {
        api.find({ phone, account, firstName, lastName }, (data) => {
            console.table(data);
            if (data) {
                history.push({
                    pathname: '/buy',
                    state: { data },
                });
            }
        });
    };

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                initialValues={{
                    phone: '',
                    account: '',
                    firstName: '',
                    lastName: '',
                }}
                render={({ handleSubmit, form, values, initialValues }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() =>
                                setTimeout(form.reset)
                            );
                        }}>
                        <Phone
                            form={form}
                            initialValues={initialValues}
                            values={values}
                        />
                        <Account
                            form={form}
                            initialValues={initialValues}
                            values={values}
                        />
                        <FirstName
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            placeholder='first name'
                        />
                        <LastName
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            placeholder='last name'
                        />
                        <Form.Button content='Find' />
                    </Form>
                )}
            />
        </>
    );
};

export default FindForm;
