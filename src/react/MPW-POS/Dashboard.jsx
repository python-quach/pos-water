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
    const { component } = useContext(StoreContext);
    const { screen, onSubmit, input, button, header } = component.dashboard;

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <Form
                onSubmit={onSubmit}
                render={({ form }) => (
                    <>
                        <Field
                            name={input.phone.attr}
                            normalize={input.phone.normalize}
                            onFocus={() => input.phone.onFocus(form)}
                        />
                        <Field
                            name={input.account.attr}
                            normalize={input.account.normalize}
                            onFocus={() => input.account.onFocus(form)}
                        />
                        <Field
                            name={input.firstName.attr}
                            onFocus={() => input.firstName.onFocus(form)}
                        />
                        <Field
                            name={input.lastName.attr}
                            onFocus={() => input.lastName.onFocus(form)}
                        />
                        <Divider hidden />
                        <Button.Pulse attr={button.find.attr} />
                        <Button.Pulse
                            attr={button.add.attr}
                            onClick={button.add.onClick}
                        />
                        <Button.Pulse
                            attr={button.report.attr}
                            onClick={button.report.onClick}
                        />
                        <Button.Pulse
                            attr={button.logout.attr}
                            onClick={button.logout.onClick}
                        />
                    </>
                )}
            />
        </Screen>
    );
};

export default Dashboard;
