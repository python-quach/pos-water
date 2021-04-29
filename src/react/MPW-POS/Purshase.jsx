import Screen from './Screen';
import Header from './Header';
import PurchaseForm from './Form';
import Button from './Button';
import Field from './Field';

import { useContext } from 'react';
import { StoreContext } from './store';
import { Form } from 'semantic-ui-react';

const Purchase = () => {
    const { screen, header, onSubmit, input, button } = useContext(
        StoreContext
    ).component.purchase;
    return (
        <Screen screen={screen}>
            <Header {...header} />
            <PurchaseForm
                onSubmit={onSubmit}
                render={({ form, values }) => (
                    <>
                        <Form.Group>
                            <Field name={input.account.attr} />
                            <Field name={input.since.attr} />
                            <Field name={input.areaCode.attr} />
                            <Field name={input.phone.attr} />
                            <Field name={input.fullname.attr} />
                            <Field name={input.first.attr} />
                            <Field name={input.last.attr} />
                            <Button
                                attr={button.edit.attr}
                                onClick={() => button.edit.onClick}
                            />
                            <Button
                                attr={button.cancel.attr}
                                onClick={() =>
                                    button.cancel.onClick(form, values)
                                }
                            />
                            <Button
                                attr={button.save.attr}
                                onClick={() =>
                                    button.save.onClick(form, values)
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input type='hidden' width={13} />
                            <Field name={input.buy.attr} />
                            <Field name={input.remain.attr} />
                            <Button attr={button.buy.attr} onClick={() => {}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input type='hidden' width={13} />
                            <Field name={input.fee.attr} />
                            <Field name={input.gallon.attr} />
                            <Button
                                attr={button.renew.attr}
                                onClick={() => {}}
                            />
                        </Form.Group>
                    </>
                )}
            />
        </Screen>
    );
};

export default Purchase;
