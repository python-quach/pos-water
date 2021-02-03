import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
import { Field } from '../Field/Field';

const BuyForm = ({ api, history }) => {
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
        gallonCurrent,
        gallonRemain,
    } = state || {};

    const onSubmit = async (data) => {
        console.log(data, api);
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
                    currentGallon: gallonCurrent,
                    gallonBuy: 0,
                    remain: gallonRemain,
                    renewalFee: 0,
                    renewalAmount: 0,
                }}
                render={({ handleSubmit, form, values, initialValues }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() => {
                                setTimeout(
                                    console.log('update buy form and print')
                                );
                            });
                        }}>
                        <Form.Group>
                            <Field.BuyDate />
                            <Field.BuyTime />
                            <Form.Input type='hidden' width={6} />
                            <Field.BuyMemberSince />
                            <Field.BuyAccount />
                            <Field.BuyRecord />
                        </Form.Group>
                    </Form>
                )}></FinalForm>
        </>
    );
};

export default BuyForm;
