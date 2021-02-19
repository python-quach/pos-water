import { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Phone from '../Field/Find/Phone';
import Account from '../Field/Find/Account';
import Name from '../Field/Find/Name';
import FindButton from '../Button/FindButton';

const FindForm = ({ api, history }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async ({ phone, account, firstName, lastName }) => {
        api.find({ phone, account, firstName, lastName }, (data) => {
            if (data.membership) {
                api.lastRecord(({ record_id }) => {
                    console.log({ data, record_id });
                    history.push({
                        pathname: '/buy',
                        state: { ...data.membership, newRecordID: record_id },
                    });
                });
            } else if (data.memberships) {
                console.table(data.memberships);
                history.push({
                    pathname: '/accounts',
                    state: data.memberships,
                });
            } else {
                setErrorMessage(true);
                document.getElementById('phone').focus();
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
                        // size='massive'
                        size='large'
                        onSubmit={(event) => {
                            handleSubmit(event).then(() =>
                                setTimeout(form.reset)
                            );
                        }}>
                        <Phone
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                        />
                        <Account
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                        />
                        <Name
                            name='firstName'
                            form={form}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            placeholder='first name'
                        />
                        <Name
                            name='lastName'
                            form={form}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            placeholder='last name'
                        />
                        {/* <FirstName
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                            placeholder='first name'
                        />
                        <LastName
                            form={form}
                            initialValues={initialValues}
                            values={values}
                            setErrorMessage={setErrorMessage}
                            errorMessage={errorMessage}
                            placeholder='last name'
                        /> */}
                        <FindButton
                            errorMessage={errorMessage}
                            values={values}
                        />
                    </Form>
                )}
            />
        </>
    );
};

export default FindForm;
