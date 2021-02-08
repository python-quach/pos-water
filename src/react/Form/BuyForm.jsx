import { useEffect, useState } from 'react';
import { Form, Table, Divider } from 'semantic-ui-react';
import {
    Form as FinalForm,
    FormSpy,
    Field as FinalField,
} from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { currentDate, getCurrentTime } from '../../helpers/helpers';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';

const BuyForm = ({ api, history }) => {
    const { state } = history.location;

    const [disable, setDisable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [receipt, setReceipt] = useState(history.location.state || {});

    const handleDone = () => {
        history.push('/dashboard');
        console.clear();
    };

    const resetRenewForm = (form) => {
        form.change('fee', 0);
        form.change('renew', 0);
    };

    const resetBuyForm = (form, previous) => {
        form.change('buy', 0);
        form.change('remain', previous);
    };

    // Final Form Validation

    useEffect(() => {
        document.getElementById('buy').focus();
    }, []);

    const {
        record_id,
        account,
        firstName,
        lastName,
        fullname,
        areaCode,
        threeDigit,
        fourDigit,
        phone,
        memberSince,
        remain,
    } = state || {};

    const onSubmit = async (data) => {
        const { buy, renew, prev } = data;
        if (buy) {
            api.buy({ ...data, renew: null }, (result) => {
                console.table([{ name: 'Buy Receipt', ...result.row }]);
                setReceipt(result.row);
            });
        }
        if (renew) {
            api.renew(
                // { ...data, prev: prev + renew, remain: prev + renew },
                // { ...data, remain: prev + renew },
                { ...data, buy: null, remain: prev + renew },
                (result) => {
                    console.table([{ name: 'Renew Receipt', ...result.row }]);
                    setReceipt(result.row);
                }
            );
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

    const updateForm = (form, values) => {
        const { buy, renew, remain, record_id } = values;
        if (buy) {
            form.initialize({
                ...values,
                record_id: record_id + 1,
                prev: remain,
                buy: 0,
                invoiceDate: currentDate(),
                invoiceTime: getCurrentTime(),
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
                invoiceTime: getCurrentTime(),
            });
        }
    };

    useEffect(() => {
        if (!state) history.push('/dashboard');
    });

    return (
        <>
            {!receipt.renew ? (
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Last Receipt</Table.HeaderCell>
                            <Table.HeaderCell>Account</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Prev </Table.HeaderCell>
                            <Table.HeaderCell>Buy</Table.HeaderCell>
                            <Table.HeaderCell>Remain</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                {receipt ? receipt.record_id : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.account : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt
                                    ? receipt.areaCode + '-' + receipt.phone
                                    : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.firstName : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.lastName : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.prev : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.buy : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.remain : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.invoiceDate : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.invoiceTime : ''}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            ) : (
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Last Receipt</Table.HeaderCell>
                            <Table.HeaderCell>Account</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Fee</Table.HeaderCell>
                            <Table.HeaderCell>Renew</Table.HeaderCell>
                            <Table.HeaderCell>Prev </Table.HeaderCell>
                            <Table.HeaderCell>Remain</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                {receipt ? receipt.record_id : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.account : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt
                                    ? receipt.areaCode + '-' + receipt.phone
                                    : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.firstName : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.lastName : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.fee : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.renew : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.prev : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.remain : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.invoiceDate : ''}
                            </Table.Cell>
                            <Table.Cell>
                                {receipt ? receipt.invoiceTime : ''}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )}
            <Divider />
            <FinalForm
                initialValuesEqual={() => true}
                onSubmit={onSubmit}
                initialValues={{
                    record_id: record_id + 1 || '',
                    account: account,
                    firstName: firstName,
                    lastName: lastName,
                    fullname: fullname,
                    areaCode: areaCode,
                    threeDigit: threeDigit,
                    fourDigit: fourDigit,
                    phone: phone,
                    memberSince: memberSince,
                    prev: remain,
                    buy: 0,
                    remain: remain,
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
                            {/* <Form.Input type='hidden' width={!edit ? 6 : 4} /> */}
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
                                remain={remain}
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
                            {/* <Button.Edit
                                edit={edit}
                                form={form}
                                setEdit={setEdit}
                                handleEdit={api.edit}
                                values={values}
                            /> */}
                            {/* <Button.Done
                                edit={edit}
                                handleDone={handleDone}
                                values={values}
                            /> */}
                            <Form.Input type='hidden' width={14} />
                            {/* <Form.Input type='hidden' width={13} /> */}
                            {/* <Form.Input type='hidden' width={12} /> */}
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
                            {/* <Button.Done
                                edit={edit}
                                handleDone={handleDone}
                                values={values}
                            /> */}
                        </Form.Group>
                        {/* <Form.Group> */}
                        {/* <Form.Input type='hidden' width={14} /> */}
                        <Button.Done
                            edit={edit}
                            handleDone={handleDone}
                            values={values}
                        />
                        {/* </Form.Group> */}
                    </Form>
                )}
            />
        </>
    );
};

export default BuyForm;
