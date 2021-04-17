import { useState, useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import Field from './Field';
import Button from './Button';

// FORM
export const FindForm = ({ history }) => {
    const [error, setError] = useState('');

    const handleFindMembership = async (values) => {
        console.log(values);
    };

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={handleFindMembership}
            render={({
                handleSubmit,
                form,
                values: { phone, account, firstName, lastName },
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Field.Phone
                        reset={setError}
                        onFocus={() => {
                            form.change('account', '');
                            form.change('firstName', '');
                            form.change('lastName', '');
                        }}
                    />
                    <Field.Account
                        reset={setError}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('firstName', '');
                                form.change('lastName', '');
                            });
                        }}
                    />
                    <Field.FirstName
                        reset={setError}
                        error={error}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('account', '');
                            });
                        }}
                    />
                    <Field.LastName
                        reset={setError}
                        error={error}
                        onFocus={() => {
                            form.batch(() => {
                                form.change('phone', '');
                                form.change('account', '');
                            });
                        }}
                    />
                    <Button.Find
                        error={error}
                        disabled={
                            (!phone && !account && !firstName && !lastName) ||
                            (phone && phone.length < 7)
                                ? true
                                : false
                        }
                    />
                    <Button.Add
                        onClick={(setVisible) => {
                            setVisible((prev) => !prev);
                            setTimeout(() => {
                                history.push({ pathname: '/add', state: {} });
                            }, 500);
                        }}
                    />
                    <Button.Report
                        onClick={(setVisible) => {
                            setVisible((prev) => !prev);
                            setTimeout(() => {
                                history.push({
                                    pathname: '/report',
                                    state: {},
                                });
                            }, 500);
                        }}
                    />
                    <Button.Logout
                        onClick={(setVisible) => {
                            console.log('logout');
                            setVisible((prev) => !prev);
                            setTimeout(() => {
                                history.push({ pathname: '/', state: {} });
                            }, 500);
                        }}
                    />
                </Form>
            )}
        />
    );
};

export default FindForm;
