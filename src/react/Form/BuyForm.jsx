import { Form, Divider } from 'semantic-ui-react';
import {
    Form as FinalForm,
    FormSpy,
    Field as FinalField,
} from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';

const BuyForm = ({
    api,
    onSubmit,
    renderReceipt,
    resetBuyForm,
    resetRenewForm,
    edit,
    disable,
    setDisable,
    setEdit,
    state,
    updateForm,
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
        <>
            {renderReceipt()}
            <Divider />
            <FinalForm
                initialValuesEqual={() => true}
                onSubmit={onSubmit}
                initialValues={{
                    ...state,
                    record_id: state ? state.record_id + 1 : '',
                    prev: state ? state.remain : '',
                    buy: 0,
                    fee: 0,
                    renew: 0,
                    invoiceDate: currentDate(),
                    invoiceTime: getCurrentTime(),
                }}
                render={({ handleSubmit, form, values }) => (
                    <Form
                        onSubmit={(event) => {
                            handleSubmit(event).then(() => {
                                updateForm(form, values);
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
                            <Field.BuyMemberSince
                                name='memberSince'
                                edit={edit}
                            />
                            <Field.BuyAccount name='account' edit={edit} />
                            <Field.BuyRecord name='record_id' edit={edit} />
                        </Form.Group>
                        <Form.Group>
                            <Field.BuyAreaCode edit={edit} name='areaCode' />
                            <Field.BuyPhone edit={edit} name='phone' />
                            <Field.BuyName edit={edit} name='fullname' />
                            <Button.Edit
                                edit={edit}
                                form={form}
                                setEdit={setEdit}
                                handleEdit={api.edit}
                                values={values}
                            />
                            <Form.Input type='hidden' width={!edit ? 5 : 4} />
                            <Field.BuyPreviousGallon
                                edited={edit}
                                name='prev'
                            />
                            <Field.BuyGallon
                                name='buy'
                                edit={edit}
                                disable={disable}
                                setDisable={setDisable}
                                previous={values.previousGallon}
                                form={form}
                                gallonBuy={values.gallonBuy}
                                renewAmount={values.renewalAmount}
                                remain={state ? state.remain : ''}
                                reset={resetRenewForm}
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
                                disable={disable}
                                previous={values.prev}
                                fee={values.fee}
                                renew={values.renew}
                                setDisable={setDisable}
                                form={form}
                                reset={resetBuyForm}
                                values={values}
                                updateForm={updateForm}
                            />
                            <Field.RenewAmount
                                name='renew'
                                edit={edit}
                                disable={disable}
                                previous={values.prev}
                                fee={values.fee}
                                renew={values.renew}
                                setDisable={setDisable}
                                form={form}
                                reset={resetBuyForm}
                                values={values}
                                updateForm={updateForm}
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
        </>
    );
};

export default BuyForm;
