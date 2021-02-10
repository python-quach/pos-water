import { useState } from 'react';
import {
    Form,
    TransitionablePortal,
    Segment,
    Header,
    Button,
} from 'semantic-ui-react';
import {
    Form as FinalForm,
    FormSpy,
    Field as FinalField,
} from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { Field } from '../Field/Field';
import SaveButton from '../Button/SaveButton';
import EditButton from '../Button/EditButton';
import CancelButton from '../Button/CancelButton';

// const BuyForm = ({ api, edit, disable, state, initialValues, handle }) => {
const BuyForm = ({
    api,
    state: { edit, disable, data },
    initialValues,
    handle,
}) => {
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

    return (
        <FinalForm
            initialValuesEqual={() => true}
            onSubmit={handle.onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form, values, initialValues }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => {
                            handle.updateForm(form, values);
                            document.getElementById('buy').focus();
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
                        <Field.BuyMemberSince name='memberSince' edit={edit} />
                        <Field.BuyAccount name='account' edit={edit} />
                        <Field.BuyRecord name='record_id' edit={edit} />
                    </Form.Group>
                    <Form.Group>
                        <Field.BuyAreaCode edit={edit} name='areaCode' />
                        <Field.BuyPhone edit={edit} name='phone' />
                        <Field.BuyName edit={edit} name='fullname' />
                        {!edit ? (
                            <EditButton
                                edit={edit}
                                form={form}
                                setEdit={handle.setEdit}
                                handleEdit={api.edit}
                                values={values}
                                initialValues={initialValues}
                            />
                        ) : (
                            <>
                                <CancelButton
                                    edit={edit}
                                    form={form}
                                    setEdit={handle.setEdit}
                                    handleEdit={api.edit}
                                    values={values}
                                    initialValues={initialValues}
                                />
                                <SaveButton
                                    edit={edit}
                                    form={form}
                                    setEdit={handle.setEdit}
                                    handleEdit={api.edit}
                                    values={values}
                                    initialValues={initialValues}
                                />
                            </>
                        )}
                        <Form.Input type='hidden' width={!edit ? 5 : 4} />
                        <Field.BuyPreviousGallon edited={edit} name='prev' />
                        <Field.BuyGallon
                            name='buy'
                            edit={edit}
                            disable={disable}
                            setDisable={handle.setDisable}
                            previous={values.previousGallon}
                            form={form}
                            gallonBuy={values.gallonBuy}
                            renewAmount={values.renewalAmount}
                            remain={data ? data.remain : ''}
                            reset={handle.resetRenewForm}
                        />
                        <Field.BuyRemain edited={edit} name='remain' />
                        <Form.Button
                            content='Buy'
                            style={{
                                marginTop: '30px',
                                width: '100px',
                            }}
                            color='green'
                            disabled={values.buy <= 0 || disable}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Field.RenewFee
                            name='fee'
                            edit={edit}
                            form={form}
                            disable={disable}
                            fee={values.fee}
                            previous={values.prev}
                            renew={values.renew}
                            values={values}
                            reset={handle.resetBuyForm}
                            setDisable={handle.setDisable}
                            updateForm={handle.updateForm}
                        />
                        <Field.RenewAmount
                            name='renew'
                            edit={edit}
                            form={form}
                            disable={disable}
                            fee={values.fee}
                            renew={values.renew}
                            previous={values.prev}
                            values={values}
                            reset={handle.resetBuyForm}
                            setDisable={handle.setDisable}
                            updateForm={handle.updateForm}
                        />
                        <Form.Button
                            type='submit'
                            content='Renew'
                            color='facebook'
                            style={{ marginTop: '30px', width: '100px' }}
                            disabled={!values.fee || !values.renew}
                        />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
