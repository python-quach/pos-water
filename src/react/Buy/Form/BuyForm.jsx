import { Form } from 'semantic-ui-react';
import {
    Form as FinalForm,
    FormSpy,
    Field as FinalField,
} from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import SaveButton from '../Button/SaveButton';
import EditButton from '../Button/EditButton';
import CancelButton from '../Button/CancelButton';
import BuyButton from '../Button/BuyButton';
import RenewButton from '../Button/RenewButton';
import Account from '../Field/Account';
import AreaCode from '../Field/AreaCode';
import BuyGallon from '../Field/BuyGallon';
import Date from '../Field/Date';
import GallonRemain from '../Field/GallonRemain';
import MemberSince from '../Field/MemberSince';
import Name from '../Field/Name';
import Phone from '../Field/Phone';
import PreviousGallon from '../Field/PreviousGallon';
import Time from '../Field/Time';
import RenewAmount from '../Field/RenewAmount';
import Fee from '../Field/Fee';

const BuyForm = ({ api, state, initialValues, handle }) => {
    const { edit, disable, data } = state;

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
                    size='massive'
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
                        <Date name='invoiceDate' edit={edit} />
                        <Time name='invoiceTime' edit={edit} />
                        <Form.Input type='hidden' width={8} />
                        <MemberSince name='memberSince' edit={edit} />
                        <Account name='account' edit={edit} />
                    </Form.Group>
                    <Form.Group>
                        <AreaCode edit={edit} name='areaCode' />
                        <Phone edit={edit} name='phone' />
                        <Name edit={edit} name='fullname' />
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
                                    updateReceipt={handle.setReceipt}
                                    updateHistory={handle.updateHistory}
                                />
                            </>
                        )}
                        <Form.Input type='hidden' width={!edit ? 5 : 2} />
                        <PreviousGallon edited={edit} name='prev' />
                        <BuyGallon
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
                        <GallonRemain
                            edited={edit}
                            name='remain'
                            remain={values.remain}
                        />
                        <BuyButton values={values} disable={disable} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Fee
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
                        <RenewAmount
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
                        <RenewButton values={values} />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
