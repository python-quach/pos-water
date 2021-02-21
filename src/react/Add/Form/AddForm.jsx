import { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { add, find, lastRecord } from '../../api/api';
import { currentTime, currentDate } from '../../helpers/helpers';
import InvoiceDate from '../Field/InvoiceData';
import InvoiceTime from '../Field/InvoiceTime';
import Account from '../Field/Account';
import AreaCode from '../Field/AreaCode';
import Phone from '../Field/Phone';
import FirstName from '../Field/FirstName';
import LastName from '../Field/LastName';
import Fee from '../Field/Fee';
import Renew from '../Field/Renew';

const AddForm = ({ history, record }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        const { phone, firstName, lastName, renew } = data;
        add(
            {
                ...data,
                fullname: firstName + ' ' + lastName,
                threeDigit: phone.slice(0, 3),
                fourDigit: phone.slice(4, 8),
                prev: renew,
                renew: null,
                buy: 0,
                remain: renew,
            },
            (response) => {
                if (response.error) {
                    setError(true);
                    setErrorMessage(response.error);
                } else {
                    find({ account: data.account }, (data) => {
                        lastRecord(({ record_id }) => {
                            console.log({ data, record_id });
                            history.push({
                                pathname: '/buy',
                                state: {
                                    ...data.membership,
                                    newRecordID: record_id,
                                },
                            });
                        });
                    });
                }
            }
        );
    };

    return (
        <FinalForm
            initialValuesEqual={() => true}
            onSubmit={onSubmit}
            initialValues={{
                record_id: record,
                areaCode: '',
                phone: '',
                firstName: '',
                lastName: '',
                memberSince: currentDate(),
                account: '',
                fee: 0,
                prev: 0,
                buy: 0,
                renew: 0,
                invoiceDate: currentDate(),
                invoiceTime: currentTime(),
            }}
            render={({ handleSubmit, values }) => (
                <Form
                    size='massive'
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => {
                            console.log('form submit', error, values);
                        });
                    }}>
                    <Form.Group>
                        <Form.Input type='hidden' width={12} />
                        <InvoiceDate width={2} />
                        <InvoiceTime width={2} />
                    </Form.Group>
                    <Form.Group>
                        <Account
                            setError={setError}
                            setErrorMessage={setErrorMessage}
                            error={error}
                            errorMessage={errorMessage}
                            width={2}
                        />
                        <AreaCode width={2} />
                        <Phone width={2} />
                        <FirstName width={2} />
                        <LastName width={2} />
                        <Form.Input type='hidden' width={4} />
                        <Fee width={1} />
                        <Renew width={1} />
                        <Field
                            name='renew'
                            parse={(value) => {
                                if (isNaN(parseInt(value))) return 0;
                                const onlyNums = value.replace(/[^\d]/g, '');
                                if (onlyNums.length < 5) {
                                    return parseInt(onlyNums);
                                } else {
                                    return onlyNums.substring(
                                        0,
                                        onlyNums.length - 1
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
                            size='massive'
                            type='submit'
                            content='Done'
                            color='facebook'
                            style={{ marginTop: '30px' }}
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
                            size='massive'
                            type='submit'
                            color='google plus'
                            content='Cancel'
                            style={{ marginTop: '30px' }}
                            onClick={(e) => {
                                e.preventDefault();
                                history.push('/dashboard');
                            }}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AddForm;
