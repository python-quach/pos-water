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
        console.log(data, api);
    };

    const WhenFieldChanges = ({ field, becomes, set, to, reset }) => (
        <FinalField name={set} subscription={{}}>
            {({ input: { onChange } }) => (
                <FormSpy subscription={{}}>
                    {({ form }) => (
                        <OnChange name={field}>
                            {(value) => {
                                console.log(value);
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
                    currentGallon: gallonRemain,
                    gallonBuy: 0,
                    remain: gallonRemain,
                    renewalFee: 0,
                    renewalAmount: 0,
                }}
                render={({
                    handleSubmit,
                    form,
                    values: { gallonBuy, record_id, remain, currentGallon },
                }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event)
                                .then(() => {
                                    form.initialize({
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
                                        currentGallon: remain,
                                        gallonBuy: 0,
                                        remain: remain,
                                        renewalFee: 0,
                                        renewalAmount: 0,
                                    });
                                })
                                .then(() => {
                                    // setTimeout(
                                    console.log('update buy form and print', {
                                        current: currentGallon,
                                        buy: gallonBuy,
                                        remain,
                                    });
                                    // );
                                })
                                .then(form.reset);
                        }}>
                        <WhenFieldChanges
                            field='gallonBuy'
                            becomes={gallonBuy > 0}
                            set='remain'
                            to={parseInt(currentGallon) - parseInt(gallonBuy)}
                            reset={
                                currentGallon === remain
                                    ? gallonRemain
                                    : currentGallon
                            }
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
                            <Field.BuyCurrentGallon edited={edited} />
                            <Field.BuyGallon
                                disable={disable}
                                setDisable={setDisable}
                                currentGallon={currentGallon}
                            />
                            <Field.BuyRemain edited={edited} />
                            <Form.Button
                                content='Buy'
                                style={{
                                    marginTop: '30px',
                                }}
                                color='green'
                                disabled={gallonBuy <= 0 || disable}
                            />
                        </Form.Group>
                    </Form>
                )}></FinalForm>
        </>
    );
};

export default BuyForm;
