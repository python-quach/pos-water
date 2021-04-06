import { useState, useEffect } from 'react';
import { mckeeApi } from '../../../../api/api';
import { currentDate, currentTime } from '../../../../helpers/helpers';
import Portal from '../Portal/Portal';
import Header from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';
import Button from '../Button';
import Field from '../Field';

const DashBoardScreen = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const addNewMembership = async () => {
        try {
            const { record_id } = await mckeeApi.lastRecord();
            history.push({ pathname: '/add', state: record_id });
        } catch (err) {
            throw err;
        }
    };

    const dailyReport = async () => {
        const date = currentDate();
        const time = currentTime();
        try {
            const report = mckeeApi.getDailyReport(date, time);
            return report;
        } catch (err) {
            throw err;
        }
    };

    const onSubmit = async (values) => {
        try {
            const data = await mckeeApi.find(values);
            if (data.membership) {
                const { record_id } = await mckeeApi.lastRecord();
                history.push({
                    pathname: '/buy',
                    state: { ...data.membership, newRecordID: record_id },
                });
            } else if (data.memberships) {
                history.push({
                    pathname: '/accounts',
                    state: data.memberships,
                });
            } else {
                setErrorMessage(true);
                setVisible(false);
                setVisible(true);
                document.getElementById('phone').focus();
                return values;
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        document.getElementById('phone').focus();
        return () => console.log('Dashboard cleanup');
    }, []);

    return (
        <Portal>
            <Header title='Mckee Pure Water' content='Dashboard' />
            <FindForm
                onSubmit={onSubmit}
                field={{
                    phone: (form) => (
                        <Field.Phone
                            reset={() => setErrorMessage(false)}
                            form={form}
                        />
                    ),
                    account: (form) => (
                        <Field.Account
                            reset={() => setErrorMessage(false)}
                            form={form}
                        />
                    ),
                    first: (form) => (
                        <Field.Name
                            name='firstName'
                            placeholder='first name'
                            form={form}
                            reset={() => setErrorMessage(false)}
                        />
                    ),
                    last: (form) => (
                        <Field.Name
                            name='lastName'
                            placeholder='last name'
                            form={form}
                            reset={() => setErrorMessage(false)}
                        />
                    ),
                }}
                button={{
                    find: ({ phone, account, firstName, lastName }) => (
                        <Button.Find
                            errorMessage={errorMessage}
                            visible={visible}
                            disabled={
                                (!phone &&
                                    !account &&
                                    !firstName &&
                                    !lastName) ||
                                (phone && phone.length < 7)
                                    ? true
                                    : false
                            }
                        />
                    ),
                    add: <Button.Add onClick={addNewMembership} />,
                    report: <Button.Report onClick={dailyReport} />,
                    logout: <Button.Logout onClick={() => history.push('/')} />,
                }}
            />
        </Portal>
    );
};

export default DashBoardScreen;
