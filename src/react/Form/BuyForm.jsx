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

const BuyForm = ({
    api,
    history,
    disable,
    setDisable,
    edit,
    handleDone,
    setEdit,
}) => {
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const { state } = history.location;

    const handleEdit = ({
        account,
        areaCode,
        phone,
        firstName,
        lastName,
        fullname,
    }) => {
        api.edit(
            { account, areaCode, phone, firstName, lastName, fullname },
            (data) => {
                console.table(data);
            }
        );
    };

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
            prev,
            buy,
            remain,
            fee,
            renew,
            invoiceDate,
            invoiceTime,
        } = data;

        console.table([
            {
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
                prev,
                buy,
                remain,
                fee,
                renew,
                invoiceDate,
                invoiceTime,
            },
        ]);
        api.buy(data, (result) => {});
    };

    // useEffect(() => {
    //     if (!edit) {
    //         console.log('we need to send edit here', { edit });
    //     }
    // }, [edit]);

    const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
        <FinalField name={set} subscription={{}}>
            {({ input: { onChange } }) => (
                <FormSpy subscription={{}}>
                    {({ form }) => (
                        <OnChange name={field}>
                            {(value) => {
                                // console.log({ becomes });
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
        form.initialize({
            account,
            record_id: values.record_id + 1 || '',
            areaCode: values.areaCode,
            phone: values.phone,
            fullname: values.fullname,
            firstName: values.firstName,
            lastName: values.lastName,
            memberSince,
            prev: values.remain,
            buy: 0,
            threeDigit: values.threeDigit,
            fourDigit: values.fourDigit,
            remain: values.remain,
            fee: 0,
            renew: null,
            invoiceDate: currentDate(),
            invoiceTime: getCurrentTime(),
        });
    };

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <>
            <FinalForm
                // keepDirtyOnReinitialize
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
                    renew: null,
                    invoiceDate: currentDate(),
                    invoiceTime: getCurrentTime(),
                }}
                render={({
                    handleSubmit,
                    form,
                    values,
                    initialValues,
                    touched,
                    pristine,
                    dirty,
                }) => (
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
                            <Form.Input type='hidden' width={15} />
                            <Button.Done
                                edit={edit}
                                handleDone={handleDone}
                                values={values}
                            />
                            <Button.Edit
                                setCancel={setCancel}
                                cancel={cancel}
                                edit={edit}
                                form={form}
                                setSave={setSave}
                                save={save}
                                setEdit={setEdit}
                                handleEdit={handleEdit}
                                values={values}
                                initialValues={initialValues}
                                touched={touched}
                                pristine={pristine}
                                dirty={dirty}
                            />
                        </Form.Group>
                    </Form>
                )}
            />
        </>
    );
};

export default BuyForm;
