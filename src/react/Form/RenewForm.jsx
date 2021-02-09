import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { currentDate, currentTime } from '../../helpers/helpers';
import { Field } from '../Field/Field';

const RenewForm = ({ api, history, disable, setDisable }) => {
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

    const onSubmit = async (data) => {
        console.log('renew', data, api);
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
                    todayTime: currentTime(),
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
                    values: { renewalFee, renewalAmount },
                    initialValues,
                }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event)
                                .then(() => {
                                    setTimeout(
                                        console.log('renew form and print')
                                    );
                                })
                                .then(form.reset)
                                .then(document.getElementById('buy').focus());
                        }}>
                        <Form.Group>
                            <Form.Input type='hidden' width={14} />
                            <Field.RenewFee
                                disable={disable}
                                setDisable={setDisable}
                            />
                            <Field.RenewAmount />
                            <Form.Button
                                content='Renew'
                                color='facebook'
                                style={{ marginTop: '30px' }}
                                disabled={!renewalFee || !renewalAmount}
                            />
                        </Form.Group>
                    </Form>
                )}></FinalForm>
        </>
    );
};

export default RenewForm;
