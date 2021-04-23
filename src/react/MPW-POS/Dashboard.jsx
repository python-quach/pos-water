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
    const { component, resetError, normalize } = useContext(StoreContext);
    const {
        screen,
        form: { onSubmit, input, button, click },
        header,
    } = component.dashboard;

    return (
        <Screen screen={screen}>
            <Header {...header} />
            <Form
                onSubmit={onSubmit}
                render={({ form }) => (
                    <>
                        <Field
                            name={input.phone.attr}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => input.phone.onFocus(form)}
                        />
                        <Field
                            name={input.account.attr}
                            normalize={normalize}
                            reset={resetError}
                            onFocus={() => input.account.onFocus(form)}
                        />
                        <Field
                            name={input.firstName.attr}
                            reset={resetError}
                            onFocus={() => input.firstName.onFocus(form)}
                        />
                        <Field
                            name={input.lastName.attr}
                            reset={resetError}
                            onFocus={() => input.lastName.onFocus(form)}
                        />
                        <Divider hidden />
                        <Button.Pulse attr={button.find} />
                        <Button.Pulse attr={button.add} onClick={click.add} />
                        <Button.Pulse
                            attr={button.report}
                            onClick={click.report}
                        />
                        <Button.Pulse
                            attr={button.logout}
                            onClick={click.logout}
                        />
                    </>
                )}
            />
        </Screen>
    );
};

export default Dashboard;
