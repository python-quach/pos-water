import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import {
    TodayDate,
    CurrentTime,
    MemberSince,
    Account,
    AreaCode,
    PhoneNumber,
    FullName,
    Buy,
    Remain,
    Fee,
    Renew,
} from '../Field/BuyField';

export const EditButton = ({ values }) => (
    <Form.Button
        content='Edit'
        primary
        label='Actions'
        onClick={(e) => {
            e.preventDefault();
            console.log('Edit', values);
        }}
    />
);

export const BuyButton = () => (
    <Form.Button
        style={{ width: '100px' }}
        content='Buy'
        positive
        label='Action'
    />
);

export const RenewButton = () => (
    <Form.Button
        style={{ width: '100px' }}
        content='Renew'
        primary
        label='Action'
    />
);

const initialValues = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    buy: 0,
    remain: 0,
    fee: 0,
    renew: 0,
};

const onSubmit = async (values) => {
    console.log('Buy Submit', values);
};

export const BuyForm = () => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then(form.reset);
                    }}>
                    <Form.Group>
                        <TodayDate />
                        <CurrentTime />
                        <Form.Input type='hidden' width={11} />
                        <MemberSince />
                        <Account />
                    </Form.Group>
                    <Form.Group>
                        <AreaCode />
                        <PhoneNumber />
                        <FullName />
                        <EditButton values={values} />
                        <Form.Input type='hidden' width={10} />
                        <Buy />
                        <Remain />
                        <BuyButton />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Fee />
                        <Renew />
                        <RenewButton />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
