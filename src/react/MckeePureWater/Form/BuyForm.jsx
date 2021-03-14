import { useState } from 'react';
import {
    Form as FinalForm,
    Field as FinalField,
    FormSpy,
} from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import {
    TodayDate,
    CurrentTime,
    MemberSince,
    Account,
    PhoneNumber,
    Buy,
    Remain,
    Fee,
    Renew,
    FirstName,
    LastName,
} from '../Field/BuyField';
import { OnChange } from 'react-final-form-listeners';

export const EditButton = ({ values, setEdit, edit }) => (
    <Form.Button
        type='button'
        content={edit ? 'Save' : 'Edit'}
        color={edit ? 'purple' : 'vk'}
        size='huge'
        style={{ marginTop: '30px' }}
        onClick={(e) => {
            e.preventDefault();
            console.log('Edit', values);
            setEdit((prevEdit) => !prevEdit);
        }}
    />
);

export const BuyButton = () => (
    <Form.Button
        type='submit'
        style={{ width: '250px', marginTop: '30px' }}
        content='Buy'
        icon='cart'
        labelPosition='right'
        positive
        size='huge'
    />
);

export const RenewButton = () => (
    <Form.Button
        style={{ marginTop: '30px', width: '250px' }}
        icon='redo'
        labelPosition='right'
        content='Renew'
        primary
        size='huge'
    />
);

export const BuyForm = (props) => {
    const [edit, setEdit] = useState(false);

    // const onSubmit = async (values) => {
    //     console.log('Buy Submit', values);
    //     props.setRecord(values);
    //     return values;
    // };

    const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
        <FinalField name={set} subscription={{}}>
            {({ input: { onChange } }) => (
                <FormSpy subscription={{}}>
                    {() => (
                        <OnChange name={field}>
                            {() => {
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

    return (
        <FinalForm
            onSubmit={props.onSubmit}
            // onSubmit={onSubmit}
            initialValuesEqual={() => true}
            initialValues={{
                ...props.record,
                remain: props.record.remain + props.record.gallon,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                previous: props.record.remain + props.record.gallon,
                buy: 0,
                fee: 0,
                type: 'BUY',
                gallon: 0,
            }}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then((data) => {
                            form.reset({
                                ...data,
                                remain: data.remain + data.gallon,
                                previous: data.remain + data.gallon,
                                buy: 0,
                                fee: 0,
                                gallon: 0,
                                date: new Date().toLocaleDateString(),
                                time: new Date().toLocaleTimeString(),
                            });
                        });
                    }}>
                    <WhenBuyFieldChanges
                        field='buy'
                        becomes={values.buy > 0}
                        set='remain'
                        to={parseInt(values.remain - values.buy)}
                        reset={props.record.remain}
                    />
                    <WhenBuyFieldChanges
                        field='buy'
                        becomes={values.buy !== 0}
                        set='remain'
                        to={parseInt(props.record.remain - values.buy)}
                        reset={props.record.remain}
                    />
                    <WhenBuyFieldChanges
                        field='fee'
                        becomes={values.fee > 0}
                        set='buy'
                        to={0}
                        reset={values.buy}
                    />
                    <WhenBuyFieldChanges
                        field='buy'
                        becomes={values.buy > 0}
                        set='fee'
                        to={0}
                        reset={values.fee}
                    />
                    <WhenBuyFieldChanges
                        field='buy'
                        becomes={values.buy > 0}
                        set='gallon'
                        to={0}
                        reset={values.gallon}
                    />
                    <WhenBuyFieldChanges
                        field='gallon'
                        becomes={values.gallon > 0}
                        set='buy'
                        to={0}
                        reset={values.buy}
                    />
                    <Form.Group>
                        <Account />
                        <MemberSince />
                        <PhoneNumber edit={edit} />
                        <FirstName edit={edit} />
                        <LastName edit={edit} />
                        <EditButton
                            edit={edit}
                            values={values}
                            setEdit={setEdit}
                        />
                        <Form.Input type='hidden' width={1} />
                        <TodayDate />
                        <CurrentTime />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
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
                    <Divider hidden />
                    <Divider />
                    <FormSpy>
                        {(values) => (
                            <>
                                <pre>{JSON.stringify(values.values, 0, 2)}</pre>
                                <pre>{JSON.stringify(props.record, 0, 2)}</pre>
                            </>
                        )}
                    </FormSpy>
                </Form>
            )}
        />
    );
};

export default BuyForm;
