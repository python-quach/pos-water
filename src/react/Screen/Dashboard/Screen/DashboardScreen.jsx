import { useState, useEffect } from 'react';
import Portal from '../Portal/Portal';
import Header from '../Header/StoreHeader';
import FindForm from '../Form/FindForm';
import FindButton from '../Button/FindButton';
import AddButton from '../Button/AddButton';
import ReportButton from '../Button/ReportButton';
import LogoutButton from '../Button/LogoutButton';
import Phone from '../Field/Phone';
import Account from '../Field/Account';
import Name from '../Field/Name';
import { api } from '../../../../api/api';
import { currentDate, currentTime } from '../../../../helpers/helpers';

const DashBoardScreen = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const addNewMembership = () => {
        api.lastRecord(({ record_id }) => {
            history.push({ pathname: '/add', state: record_id });
        });
    };

    const logout = () => {
        history.push('/');
    };

    const reset = () => setErrorMessage(false);

    const onSubmit = async ({ phone, account, firstName, lastName }) => {
        console.log(phone, account, firstName, lastName);
        api.find({ phone, account, firstName, lastName }, (data) => {
            console.log(data);
            if (data.membership) {
                api.lastRecord(({ record_id }) => {
                    history.push({
                        pathname: '/buy',
                        state: { ...data.membership, newRecordID: record_id },
                    });
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
            }
        });
    };

    const dailyReport = () => {
        console.log('Daily Sales Report', currentDate());
        api.getDailyReport(currentDate(), currentTime(), (data) => {
            console.log({ data });
        });
    };

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    return (
        <Portal>
            <Header title='Mckee Pure Water' content='Dashboard' />
            <FindForm
                onSubmit={onSubmit}
                field={{
                    phone: (form, values) => (
                        <Phone reset={reset} form={form} values={values} />
                    ),
                    account: (form, values) => (
                        <Account reset={reset} form={form} values={values} />
                    ),
                    first: (form, values) => (
                        <Name
                            name='firstName'
                            placeholder='first name'
                            form={form}
                            values={values}
                            reset={reset}
                        />
                    ),
                    last: (form, values) => (
                        <Name
                            name='lastName'
                            placeholder='last name'
                            form={form}
                            values={values}
                            reset={reset}
                        />
                    ),
                }}
                button={{
                    find: ({ phone, account, firstName, lastName }) => (
                        <FindButton
                            errorMessage={errorMessage}
                            visible={visible}
                            disabled={
                                !phone && !account && !firstName && !lastName
                                    ? true
                                    : false
                            }
                        />
                    ),
                    add: <AddButton onClick={addNewMembership} />,
                    report: <ReportButton onClick={dailyReport} />,
                    logout: <LogoutButton onClick={logout} />,
                }}
            />
        </Portal>
    );
};

export default DashBoardScreen;
