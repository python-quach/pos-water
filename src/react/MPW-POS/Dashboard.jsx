import Header from './Header';
import Screen from './Screen';
import Form from './Form';
import Button from './Button';
import Field from './Field';

import { Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

// DASHBOARD SCREEN
export const Dashboard = () => {
    const { component, resetError, normalize, click } = useContext(
        StoreContext
    );
    const {
        onSubmit,
        input: { phone, account, firstName, lastName },
        button: { find, add, report, logout },
    } = component.dashboard;

    return (
        <Screen name='dashboard'>
            <Header title='Mckee Pure Water' content='Dashboard' />
            <Form
                onSubmit={onSubmit}
                render={({ form }) => (
                    <>
                        <Field
                            name={phone}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => phone.onFocus(form)}
                        />
                        <Field
                            name={account}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => account.onFocus(form)}
                        />
                        <Field
                            name={firstName}
                            reset={resetError}
                            onFocus={() => firstName.onFocus(form)}
                        />
                        <Field
                            name={lastName}
                            reset={resetError}
                            onFocus={() => lastName.onFocus(form)}
                        />
                        <Divider hidden />
                        <Button.Pulse attr={find} />
                        <Button.Pulse attr={add} onClick={click.add} />
                        <Button.Pulse attr={report} onClick={click.report} />
                        <Button.Pulse attr={logout} onClick={click.logout} />
                    </>
                )}
            />
        </Screen>
    );
};

export default Dashboard;
