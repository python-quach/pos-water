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
import { api } from '../../../api/api';
import { currentTime, currentDate } from '../../../helpers/helpers';

const updateForm = (form, values) => {
    const { buy, renew, remain, record_id } = values;
    if (buy) {
        form.initialize({
            ...values,
            record_id: record_id + 1,
            prev: remain,
            buy: 0,
            invoiceDate: currentDate(),
            invoiceTime: currentTime(),
        });
    }

    if (renew) {
        form.initialize({
            ...values,
            record_id: values.record_id + 1 || '',
            prev: remain + renew,
            remain: remain + renew,
            fee: 0,
            renew: 0,
            invoiceDate: currentDate(),
            invoiceTime: currentTime(),
        });
    }
};

const resetRenewForm = (form) => {
    form.change('fee', 0);
    form.change('renew', 0);
};

const resetBuyForm = (form, previous) => {
    form.change('buy', 0);
    form.change('remain', previous);
};

const BuyForm = ({
    receipt,
    disable,
    edit,
    setEdit,
    setDisable,
    updateHistory,
    setOpenReceipt,
    setReceipt,
    setRecord,
    setActivePage,
    setTotalFee,
    setTotalRenew,
    setTotalBuy,
}) => {
    const initialValues = {
        ...receipt,
        record_id: receipt ? receipt.newRecordID : '',
        prev: receipt ? receipt.remain : '',
        buy: 0,
        fee: 0,
        renew: 0,
        invoiceDate: currentDate(),
        invoiceTime: currentTime(),
    };
    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;

        if (buy) {
            api.buy({ ...data, renew: null }, (data) => {
                setOpenReceipt(true);
                setReceipt(data);
                api.history(
                    {
                        account: data.account,
                        limit: 10,
                        offset: 0,
                        phone: data.phone,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        memberSince: data.memberSince,
                    },

                    (response) => {
                        setRecord(response);
                        setActivePage(1);
                        api.totalFee(
                            {
                                account: data.account,
                                phone: data.phone,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                memberSince: data.memberSince,
                            },
                            (response) => {
                                console.log('totalFee', response);
                                setTotalFee(response);
                                api.totalRenew(
                                    {
                                        account: data.account,
                                        phone: data.phone,
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        memberSince: data.memberSince,
                                    },
                                    (response) => {
                                        console.log('totalRenew', response);
                                        setTotalRenew(response);
                                        api.totalBuy(
                                            {
                                                account: data.account,
                                                phone: data.phone,
                                                firstName: data.firstName,
                                                lastName: data.lastName,
                                                memberSince: data.memberSince,
                                            },
                                            (response) => {
                                                console.log(
                                                    'totalBuy',
                                                    response
                                                );
                                                setTotalBuy(response);
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            });
        }

        if (renew) {
            api.renew({ ...data, buy: null, remain: prev + renew }, (data) => {
                setReceipt(data);
                setOpenReceipt(true);
                api.history(
                    {
                        account: data.account,
                        limit: 10,
                        offset: 0,
                        phone: data.phone,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        memberSince: data.memberSince,
                    },
                    (response) => {
                        setRecord(response);
                        setActivePage(1);
                        api.totalFee(data.account, (response) => {
                            console.log('totalFee', response);
                            setTotalFee(response);
                            api.totalRenew(data.account, (response) => {
                                console.log('totalRenew', response);
                                setTotalRenew(response);
                                api.totalBuy(data.account, (response) => {
                                    console.log('totalBuy', response);
                                    setTotalBuy(response);
                                });
                            });
                        });
                    }
                );
            });
        }
    };

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
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, form, values, initialValues }) => (
                <Form
                    size='huge'
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => {
                            updateForm(form, values);
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
                                setEdit={setEdit}
                                handleEdit={api.edit}
                                values={values}
                                initialValues={initialValues}
                            />
                        ) : (
                            <>
                                <CancelButton
                                    edit={edit}
                                    form={form}
                                    setEdit={setEdit}
                                    handleEdit={api.edit}
                                    values={values}
                                    initialValues={initialValues}
                                />
                                <SaveButton
                                    edit={edit}
                                    form={form}
                                    setEdit={setEdit}
                                    handleEdit={api.edit}
                                    values={values}
                                    initialValues={initialValues}
                                    updateReceipt={setReceipt}
                                    updateHistory={updateHistory}
                                />
                            </>
                        )}
                        <Form.Input type='hidden' width={!edit ? 5 : 1} />
                        <PreviousGallon edited={edit} name='prev' />
                        <BuyGallon
                            name='buy'
                            edit={edit}
                            disable={disable}
                            setDisable={setDisable}
                            previous={values.previousGallon}
                            form={form}
                            gallonBuy={values.gallonBuy}
                            renewAmount={values.renewalAmount}
                            remain={receipt ? receipt.remain : ''}
                            reset={resetRenewForm}
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
                            reset={resetBuyForm}
                            setDisable={setDisable}
                            updateForm={updateForm}
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
                            reset={resetBuyForm}
                            setDisable={setDisable}
                            updateForm={updateForm}
                        />
                        <RenewButton values={values} />
                    </Form.Group>
                </Form>
            )}
        />
    );
};

export default BuyForm;
