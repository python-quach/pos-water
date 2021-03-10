import { useState } from 'react';

import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

import Phone from '../Field/Phone';
import Account from '../Field/Account';
import Name from '../Field/Name';

import FindButton from '../Button/FindButton';
import { api } from '../../../api/api';

const FindForm = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async ({ phone, account, firstName, lastName }) => {
        api.find({ phone, account, firstName, lastName }, (data) => {
            if (data.membership) {
                api.lastRecord(({ record_id }) => {
                    // console.log({ data, record_id });
                    history.push({
                        pathname: '/buy',
                        state: { ...data.membership, newRecordID: record_id },
                    });
                });
            } else if (data.memberships) {
                // console.table(data.memberships);
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
                    size='large'
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => setTimeout(form.reset));
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
                    <FindButton errorMessage={errorMessage} values={values} />
                </Form>
            )}
        />
    );
};

export default FindForm;
