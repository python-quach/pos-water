import { useState } from 'react';
import {
    Form as FinalForm,
    Field as FinalField,
    FormSpy,
} from 'react-final-form';
import { Form, Table, Divider } from 'semantic-ui-react';
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

export const EditButton = ({
    values,
    setEdit,
    edit,
    handleEdit,
    setOpenReceipt,
}) => (
    <Form.Button
        type='button'
        disabled={!values.first || !values.last}
        content={edit ? 'Save' : 'Edit'}
        color={edit ? 'google plus' : 'vk'}
        size='huge'
        style={{ marginTop: '30px' }}
        onClick={(e) => {
            e.preventDefault();
            console.log('Edit', values);
            if (edit) handleEdit(values);
            // setOpenReceipt(false);
            setEdit((prevEdit) => !prevEdit);
        }}
    />
);

export const BuyButton = ({ disabled, setOpenReceipt }) => (
    <Form.Button
        disabled={disabled}
        style={{ width: '250px', marginTop: '30px' }}
        content='Buy'
        icon='cart'
        labelPosition='right'
        positive
        size='huge'
        onClick={() => {
            setOpenReceipt(false);
        }}
    />
);

export const RenewButton = ({ disabled, setOpenReceipt }) => (
    <Form.Button
        disabled={disabled}
        style={{ marginTop: '30px', width: '250px' }}
        icon='redo'
        labelPosition='right'
        content='Renew'
        primary
        size='huge'
        onClick={() => {
            setOpenReceipt(false);
        }}
    />
);

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

export const BuyForm = (props) => {
    const [edit, setEdit] = useState(false);

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
        <FinalForm
            onSubmit={props.onSubmit}
            initialValuesEqual={() => true}
            initialValues={{
                ...props.record,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                buy: 0,
                fee: 0,
                type: 'BUY',
                gallon: 0,
                previous: props.record.remain,
            }}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onKeyDown={onKeyDown}
                    onSubmit={(event) => {
                        handleSubmit(event).then((data) => {
                            console.log('handleSubmit LOOK AT ME BUY', data);
                            form.reset({
                                ...data,
                                previous: data.remain,
                                buy: 0,
                                fee: 0,
                                gallon: 0,
                                date: new Date().toLocaleDateString(),
                                time: new Date().toLocaleTimeString(),
                            });
                            props.setOpenReceipt(true);
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
                        <Account edit={edit} />
                        <MemberSince edit={edit} />
                        <PhoneNumber edit={edit} />
                        <FirstName edit={edit} />
                        <LastName edit={edit} />
                        <EditButton
                            edit={edit}
                            handleEdit={props.handleEdit}
                            values={values}
                            setEdit={setEdit}
                            setOpenReceipt={props.setOpenReceipt}
                        />
                        {edit && (
                            <Form.Button
                                type='button'
                                color='black'
                                size='huge'
                                style={{ marginTop: '30px' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.reset({
                                        ...values,
                                        first: props.record.first,
                                        last: props.record.last,
                                        phone: props.record.phone,
                                    });
                                    setEdit(false);
                                }}>
                                Cancel
                            </Form.Button>
                        )}
                        {/* <Form.Input type='hidden' width={1} /> */}
                        <TodayDate edit={edit} />
                        <CurrentTime edit={edit} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Buy edit={edit} />
                        <Remain edit={edit} />
                        <BuyButton
                            disabled={values.buy <= 0}
                            setOpenReceipt={props.setOpenReceipt}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Fee edit={edit} />
                        <Renew edit={edit} />
                        <RenewButton
                            setOpenReceipt={props.setOpenReceipt}
                            disabled={values.gallon <= 0 || values.fee <= 0}
                        />
                    </Form.Group>
                    <Divider hidden />
                    <Divider />
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Form.Button
                            type='button'
                            size='huge'
                            color='teal'
                            content='History'
                            onClick={(e) => {
                                e.preventDefault();
                                // props.setOpenBuyScreen(false);
                                props.setOpenHistory(true);
                            }}
                        />
                        <Form.Button
                            size='huge'
                            color='black'
                            content='Done'
                            onClick={(e) => {
                                e.preventDefault();
                                props.setOpenBuyScreen(false);
                                props.setOpenDashBoard(true);
                            }}
                        />
                    </Form.Group>
                    {/* <FormSpy>
                        {(values) => (
                            <>
                                <pre>{JSON.stringify(values.values, 0, 2)}</pre>
                                <pre>{JSON.stringify(props.record, 0, 2)}</pre>
                            </>
                        )}
                    </FormSpy> */}
                </Form>
            )}
        />
    );
};

export default BuyForm;
