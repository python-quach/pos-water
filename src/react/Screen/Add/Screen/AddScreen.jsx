import { useEffect, useState } from 'react';
import Portal from '../../../Portal/Portal';
import { AddPortalConfig as config } from '../../../../config/portal';
import { mckeeApi } from '../../../../api/api';
import AddForm from '../Form/AddForm';
import Header from '../Header/StoreHeader';
import Field from '../Field';
import Button from '../Button';

const AddScreen = ({ history }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [visible, setVisible] = useState(true);
    const record = history.location.state;
    console.log(record);
    const date = new Date();
    const initialValues = {
        record_id: record,
        areaCode: '',
        phone: '',
        firstName: '',
        lastName: '',
        memberSince: date.toLocaleDateString(),
        account: '',
        fee: 0,
        prev: 0,
        buy: 0,
        renew: 0,
        invoiceDate: date.toLocaleDateString(),
        invoiceTime: date.toLocaleTimeString(),
    };

    const onSubmit = async (data) => {
        const { phone, firstName, lastName, renew } = data;
        const membership = {
            ...data,
            fullname: firstName + ' ' + lastName,
            threeDigit: phone.slice(0, 3),
            fourDigit: phone.slice(4, 8),
            prev: renew,
            renew: null,
            buy: 0,
            remain: renew,
        };
        setVisible(false);
        setVisible(true);
        try {
            const response = await mckeeApi.add(membership);
            if (response.error) {
                setError(true);
                setErrorMessage(response.error);
            } else {
                const result = await mckeeApi.find({ account: data.account });
                const { record_id } = await mckeeApi.lastRecord();
                history.push({
                    pathname: '/buy',
                    state: {
                        ...result.membership,
                        newRecordID: record_id,
                    },
                });
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (!record) history.push('/dashboard');
        document.getElementById('account').focus();
        return () => {
            console.log('AddScreen cleanup');
        };
    }, [history, record]);

    return (
        <Portal {...config}>
            <Header title='Mckee Pure Water' content='New Membership' />
            <AddForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                field={{
                    date: <Field.Date width={2} />,
                    time: <Field.Time width={2} />,
                    account: (
                        <Field.Account
                            width={2}
                            error={error}
                            errorMessage={errorMessage}
                            onFocus={() => {
                                setError(false);
                                setErrorMessage('');
                            }}
                        />
                    ),
                    areaCode: <Field.AreaCode width={1} />,
                    phone: <Field.Phone width={2} />,
                    firstName: <Field.FirstName width={2} />,
                    lastName: <Field.LastName width={2} />,
                    fee: <Field.Fee width={1} />,
                    renew: <Field.Renew width={1} />,
                }}
                button={{
                    done: (values) => (
                        <Button.Done
                            visible={visible}
                            onClick={() => {
                                setVisible(false);
                            }}
                            disabled={
                                !values.fee ||
                                !values.renew ||
                                !values.firstName ||
                                !values.lastName ||
                                !values.phone ||
                                !values.areaCode ||
                                values.areaCode.length < 3 ||
                                values.phone.length < 8 ||
                                !values.account
                            }
                        />
                    ),
                    cancel: (
                        <Button.Cancel
                            onClick={() => history.push('/dashboard')}
                        />
                    ),
                }}
            />
        </Portal>
    );
};

export default AddScreen;
