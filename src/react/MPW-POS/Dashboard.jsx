import { Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from './store';

import Header from './Header';
import Screen from './Screen';
import FindForm from './Form';
import Button from './Button';
import Field from './Field';

// DASHBOARD SCREEN
export const Dashboard = () => {
    const { component, resetError, normalize, close, open } = useContext(
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
            <FindForm
                onSubmit={onSubmit}
                render={({ form }) => (
                    <>
                        <Field
                            name={phone}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => {
                                form.batch(() => {
                                    form.change('account', '');
                                    form.change('firstName', '');
                                    form.change('lastName', '');
                                });
                            }}
                        />
                        <Field
                            name={account}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => {
                                form.batch(() => {
                                    form.change('phone', '');
                                    form.change('firstName', '');
                                    form.change('lastName', '');
                                });
                            }}
                        />
                        <Field
                            name={firstName}
                            reset={resetError}
                            onFocus={() => {
                                form.batch(() => {
                                    form.change('phone', '');
                                    form.change('account', '');
                                });
                            }}
                        />
                        <Field
                            name={lastName}
                            reset={resetError}
                            onFocus={() => {
                                form.batch(() => {
                                    form.change('phone', '');
                                    form.change('account', '');
                                });
                            }}
                        />
                        <Divider hidden />
                        <Button.Pulse attr={find} />
                        <Button.Pulse attr={add} onClick={open.add} />
                        <Button.Pulse attr={report} onClick={open.report} />
                        <Button.Pulse attr={logout} onClick={close.dashboard} />
                    </>
                )}
            />
        </Screen>
    );
};

export default Dashboard;
