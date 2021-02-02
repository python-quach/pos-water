import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import Phone from '../Field/Phone';
import Account from '../Field/Account';
import FirstName from '../Field/FirstName';
import LastName from '../Field/LastName';
import FindButton from '../Button/FindButton';

const FindForm = ({ api, history }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async ({ phone, account, firstName, lastName }) => {
        api.find({ phone, account, firstName, lastName }, (data) => {
            console.table(data);
            if (data) {
                history.push({
                    pathname: '/buy',
                    state: { data },
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
                        <FirstName
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
                        />
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
