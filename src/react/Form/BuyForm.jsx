import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
import Date from '../Field/Buy/Date';
import Time from '../Field/Buy/Time';
import MemberSince from '../Field/Buy/MemberSince';
import Account from '../Field/Buy/Account';
import Record from '../Field/Buy/Record';

const BuyForm = ({ onSubmit, state }) => {
    console.log(state);
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
                            <Date />
                            <Time />
                            <Form.Input type='hidden' width={6} />
                            <MemberSince />
                            <Account />
                            <Record />
                        </Form.Group>
                    </Form>
                )}></FinalForm>
        </>
    );
};

export default BuyForm;
