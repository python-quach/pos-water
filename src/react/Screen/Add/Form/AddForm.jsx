import { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { add, find, lastRecord } from '../../../api/api';
import { currentTime, currentDate } from '../../../helpers/helpers';
import InvoiceDate from '../Field/InvoiceDate';
import InvoiceTime from '../Field/InvoiceTime';
import Account from '../Field/Account';
import AreaCode from '../Field/AreaCode';
import Phone from '../Field/Phone';
import FirstName from '../Field/FirstName';
import LastName from '../Field/LastName';
import Fee from '../Field/Fee';
import Renew from '../Field/Renew';
import DoneButton from '../Button/DoneButton';
import CancelButton from '../Button/CancelButton';

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
                            // console.log({ data, record_id });
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
                    size='huge'
                    onSubmit={(event) => {
                        handleSubmit(event);
                    }}>
                    {/* <Form.Group>
                        <Form.Input type='hidden' width={12} />
                        <InvoiceDate width={2} />
                        <InvoiceTime width={2} />
                    </Form.Group> */}
                    <Form.Group>
                        <InvoiceDate width={2} />
                        <InvoiceTime width={2} />
                        <Account
                            setError={setError}
                            setErrorMessage={setErrorMessage}
                            error={error}
                            errorMessage={errorMessage}
                            width={2}
                        />
                        <AreaCode width={1} />
                        <Phone width={2} />
                        <FirstName width={2} />
                        <LastName width={2} />
                        {/* <Form.Input type='hidden' width={3} /> */}
                        <Fee width={1} />
                        <Renew width={1} />
                        <DoneButton values={values} />
                        <CancelButton history={history} />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default AddForm;
