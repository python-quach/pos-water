import { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import {
    Form as FinalForm,
    FormSpy,
    Field as FinalField,
} from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';

const BuyForm = ({ api, history }) => {
    const { state } = history.location;

    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleDone = () => {
        history.push('/dashboard');
        console.clear();
    };

    const resetRenewForm = (form) => {
        form.change('fee', 0);
        form.change('renew', 0);
    };

    const resetBuyForm = (form, previous) => {
        form.change('buy', 0);
        form.change('remain', previous);
    };

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        remain,
    } = state || {};

    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;
        if (buy) {
            api.buy({ ...data, renew: null }, (result) => {
                console.table([{ name: 'Buy Receipt', ...result.row }]);
            });
        }
        if (renew) {
            api.renew(
                // { ...data, prev: prev + renew, remain: prev + renew },
                // { ...data, remain: prev + renew },
                { ...data, buy: null, remain: prev + renew },
                (result) => {
                    console.table([{ name: 'Renew Receipt', ...result.row }]);
                }
            );
        }
    };

    const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
        <FinalField name={set} subscription={{}}>
            {({ input: { onChange } }) => (
                <FormSpy subscription={{}}>
                    {({ form }) => (
                        <OnChange name={field}>
                            {(value) => {
                                if (becomes) {
                                    onChange(to);
                                } else {
                                    onChange(reset);
                                }
                            }}
                        </OnChange>
                    )}
                </FormSpy>
            )}
        </FinalField>
    );

    const updateForm = (form, values) => {
        const { buy, renew, remain, record_id } = values;
        if (buy) {
            form.initialize({
                ...values,
                record_id: record_id + 1,
                prev: remain,
                buy: 0,
                invoiceDate: currentDate(),
                invoiceTime: getCurrentTime(),
            });
        }

        if (renew) {
            form.initialize({
                ...values,
                record_id: values.record_id + 1 || '',
                // prev: remain + renew,
                prev: remain + renew,
                remain: remain + renew,
                fee: 0,
                renew: 0,
                invoiceDate: currentDate(),
                invoiceTime: getCurrentTime(),
            });
        }
    };

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <>
            <FinalForm
                initialValuesEqual={() => true}
                onSubmit={onSubmit}
                initialValues={{
                    record_id: record_id + 1 || '',
                    account: account,
                    firstName: firstName,
                    lastName: lastName,
                    fullname: fullname,
                    areaCode: areaCode,
                    threeDigit: threeDigit,
                    fourDigit: fourDigit,
                    phone: phone,
                    memberSince: memberSince,
                    prev: remain,
                    buy: 0,
                    remain: remain,
                    fee: 0,
                    renew: 0,
                    invoiceDate: currentDate(),
                    invoiceTime: getCurrentTime(),
                }}
                render={({ handleSubmit, form, values }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() => {
                                updateForm(form, values);
                            });
                        }}>
                        <WhenBuyFieldChanges
                            field='firstName'
                            becomes={edit}
                            set='fullname'
                            to={values.firstName + ' ' + values.lastName}
                        />
                        <WhenBuyFieldChanges
                            field='lastName'
                            becomes={edit}
                            set='fullname'
                            to={values.firstName + ' ' + values.lastName}
                        />

                        <WhenBuyFieldChanges
                            field='buy'
                            becomes={values.buy > 0}
                            set='remain'
                            to={parseInt(values.prev - values.buy)}
                            reset={values.prev}
                        />

                        <Form.Group>
                            <Field.BuyDate name='invoiceDate' edit={edit} />
                            <Field.BuyTime name='invoiceTime' edit={edit} />
                            <Form.Input type='hidden' width={6} />
                            <Field.BuyMemberSince
                                name='memberSince'
                                edit={edit}
                            />
                            <Field.BuyAccount name='account' edit={edit} />
                            <Field.BuyRecord name='record_id' edit={edit} />
                        </Form.Group>
                        <Form.Group>
                            <Field.BuyAreaCode edit={edit} name='areaCode' />
                            <Field.BuyPhone edit={edit} name='phone' />
                            <Field.BuyName edit={edit} name='fullname' />
                            <Form.Input type='hidden' width={!edit ? 6 : 4} />
                            <Field.BuyPreviousGallon
                                edited={edit}
                                name='prev'
                            />
                            <Field.BuyGallon
                                name='buy'
                                edit={edit}
                                disable={disable}
                                setDisable={setDisable}
                                previous={values.previousGallon}
                                form={form}
                                gallonBuy={values.gallonBuy}
                                renewAmount={values.renewalAmount}
                                remain={remain}
                                reset={resetRenewForm}
                            />
                            <Field.BuyRemain edited={edit} name='remain' />
                            <Form.Button
                                content='Buy'
                                style={{
                                    marginTop: '30px',
                                }}
                                color='green'
                                disabled={values.buy <= 0 || disable}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button.Edit
                                edit={edit}
                                form={form}
                                setEdit={setEdit}
                                handleEdit={api.edit}
                                values={values}
                            />
                            <Button.Done
                                edit={edit}
                                handleDone={handleDone}
                                values={values}
                            />
                            <Form.Input type='hidden' width={14} />
                            <Field.RenewFee
                                name='fee'
                                edit={edit}
                                disable={disable}
                                previous={values.prev}
                                fee={values.fee}
                                renew={values.renew}
                                setDisable={setDisable}
                                form={form}
                                reset={resetBuyForm}
                                values={values}
                                updateForm={updateForm}
                            />
                            <Field.RenewAmount
                                name='renew'
                                edit={edit}
                                disable={disable}
                                previous={values.prev}
                                fee={values.fee}
                                renew={values.renew}
                                setDisable={setDisable}
                                form={form}
                                reset={resetBuyForm}
                                values={values}
                                updateForm={updateForm}
                            />
                            <Form.Button
                                type='submit'
                                content='Renew'
                                color='facebook'
                                style={{ marginTop: '30px' }}
                                disabled={!values.fee || !values.renew}
                            />
                        </Form.Group>
                    </Form>
                )}
            />
        </>
    );
};

export default BuyForm;
