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

const BuyForm = ({ api, history, disable, setDisable }) => {
    const { state } = history.location;
    const {
        memberSince,
        account,
        record_id,
        firstName,
        lastName,
        fullname,
        areaCode,
        phone,
        gallonRemain,
    } = state || {};

    const [edited, setEdited] = useState(false);

    const onSubmit = async (data) => {
        const {
            previousGallon,
            gallonBuy,
            remain,
            account,
            todayTime,
            todayDate,
            record_id,
        } = data;
        console.log('buy data sent to backend', {
            account,
            previous: previousGallon,
            buy: gallonBuy,
            remain,
            date: todayDate,
            time: todayTime,
            record_id,
        });
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
        form.initialize({
            account: values.account,
            record_id: values.record_id + 1 || '',
            areaCode: values.areaCode,
            phone: values.phone,
            fullname: values.fullname,
            firstName: values.firstName,
            lastName: values.lastName,
            memberSince: values.memberSince,
            previousGallon: values.remain,
            gallonBuy: 0,
            remain: values.remain,
            renewalFee: 0,
            renewalAmount: 0,
            todayDate: currentDate(),
            todayTime: getCurrentTime(),
        });
    };

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                initialValues={{
                    todayDate: currentDate(),
                    todayTime: getCurrentTime(),
                    memberSince: memberSince,
                    account: account,
                    record_id: record_id + 1 || '',
                    areaCode: areaCode,
                    phone: phone,
                    fullname: fullname,
                    firstName: firstName,
                    lastName: lastName,
                    previousGallon: gallonRemain,
                    gallonBuy: 0,
                    remain: gallonRemain,
                    renewalFee: 0,
                    renewalAmount: 0,
                }}
                render={({ handleSubmit, form, values }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() => {
                                updateForm(form, values);
                            });
                        }}>
                        <WhenBuyFieldChanges
                            field='gallonBuy'
                            becomes={
                                values.gallonBuy > 0 ||
                                values.previousGallon !== values.remain
                            }
                            set='remain'
                            to={
                                parseInt(values.previousGallon) -
                                parseInt(values.gallonBuy)
                            }
                            reset={gallonRemain}
                        />
                        <Form.Group>
                            <Field.BuyDate />
                            <Field.BuyTime />
                            <Form.Input type='hidden' width={6} />
                            <Field.BuyMemberSince />
                            <Field.BuyAccount />
                            <Field.BuyRecord />
                        </Form.Group>
                        <Form.Group>
                            <Field.BuyAreaCode edited={edited} />
                            <Field.BuyPhone edited={edited} />
                            <Field.BuyName edited={edited} />
                            <Form.Input type='hidden' width={!edited ? 6 : 3} />
                            <Field.BuyPreviousGallon edited={edited} />
                            <Field.BuyGallon
                                disable={disable}
                                setDisable={setDisable}
                                previousGallon={values.previousGallon}
                            />
                            <Field.BuyRemain edited={edited} />
                            <Form.Button
                                content='Buy'
                                style={{
                                    marginTop: '30px',
                                }}
                                color='green'
                                disabled={values.gallonBuy <= 0 || disable}
                            />
                        </Form.Group>
                    </Form>
                )}></FinalForm>
        </>
    );
};

export default BuyForm;
