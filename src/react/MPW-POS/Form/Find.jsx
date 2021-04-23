import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import Button from '../Button';
import Field from '../Field';

export const FindForm = () => {
    const {
        component,
        helpers: {
            field: { resetError },
            normalize,
        },
        close,
        open,
    } = useContext(StoreContext);

    const {
        onSubmit,
        input: { phone, account, firstName, lastName },
        button: { find, add, report, logout },
    } = component.dashboard;

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <Form onSubmit={handleSubmit}>
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
                    <Button.Pulse
                        render={find}
                        onClick={(setVisible) => {
                            setVisible((visible) => !visible);
                        }}
                    />
                    <Button.Pulse
                        render={add}
                        onClick={(setVisible) => {
                            setVisible((visible) => !visible);
                            open.add();
                        }}
                    />
                    <Button.Pulse
                        render={report}
                        onClick={async (setVisible) => {
                            setVisible((visible) => !visible);
                            open.report();
                        }}
                    />
                    <Button.Pulse
                        render={logout}
                        onClick={async (setVisible) => {
                            setVisible((visible) => !visible);
                            close.dashboard();
                        }}
                    />
                </Form>
            )}
        />
    );
};

export default FindForm;
