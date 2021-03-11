import { Field } from 'react-final-form';
import { Form } from 'semantic-ui-react';

export const TodayDate = () => (
    <Field
        name='date'
        render={({ input }) => (
            <Form.Input id='date' label='Today Date' {...input} />
        )}
    />
);

export const CurrentTime = () => (
    <Field
        name='time'
        render={({ input }) => (
            <Form.Input id='time' label='Current Time' {...input} />
        )}
    />
);

export const MemberSince = () => (
    <Field
        name='memberSince'
        render={({ input }) => (
            <Form.Input id='memberSince' label='Member Since' {...input} />
        )}
    />
);

export const Account = () => (
    <Field
        name='account'
        render={({ input }) => (
            <Form.Input id='account' label='Account' {...input} />
        )}
    />
);

export const AreaCode = () => (
    <Field
        name='areaCode'
        render={({ input }) => (
            <Form.Input id='areaCode' label='Area Code' {...input} />
        )}
    />
);

export const PhoneNumber = () => (
    <Field
        name='phone'
        render={({ input }) => (
            <Form.Input id='phone' label='Phone Number' {...input} />
        )}
    />
);

export const FullName = () => (
    <Field
        name='fullname'
        render={({ input }) => (
            <Form.Input id='fullname' label='Customer Name' {...input} />
        )}
    />
);

export const Buy = () => (
    <Field
        name='buy'
        render={({ input }) => <Form.Input id='buy' label='Buy' {...input} />}
    />
);

export const Remain = () => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input id='remain' label='Remain' {...input} />
        )}
    />
);

export const Fee = () => (
    <Field
        name='fee'
        render={({ input }) => <Form.Input id='fee' label='Fee' {...input} />}
    />
);

export const Renew = () => (
    <Field
        name='renew'
        render={({ input }) => (
            <Form.Input id='renew' label='Renew' {...input} />
        )}
    />
);

const BuyField = {
    TodayDate,
    CurrentTime,
    MemberSince,
    AreaCode,
    PhoneNumber,
    FullName,
    Buy,
    Remain,
    Fee,
    Renew,
};

export default BuyField;
