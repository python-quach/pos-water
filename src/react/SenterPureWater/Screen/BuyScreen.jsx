import { useState, useEffect } from 'react';
import {
    Segment,
    TransitionablePortal,
    Grid,
    Divider,
    Form,
    Modal,
    Card,
    Icon,
    Table,
} from 'semantic-ui-react';
import CustomerHistory from '../History/CustomerHistory';
import Receipt from '../Receipt';
import BuyReceipt from '../Receipt/BuyReceipt';
import NewReceipt from '../Receipt/NewReceipt';
import RenewReceipt from '../Receipt/RenewReceipt';
import { Form as FinalForm, Field, FormSpy } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { renew, buy, deleteMembership, editMembership } from '../Api';
import { normalize } from '../Normalize';

const PurchaseForm = ({
    record,
    handlePurchase,
    handleEdit,
    openHistoryModal,
    setOpenReceipt,
    openDelete,
    openDeleteModal,
    closeDelete,
    closeBuyScreen,
    handleDeleteMembership,
}) => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    const initialValues = {
        ...record,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        buy: 0,
        fee: 0,
        type: 'BUY',
        gallon: 0,
        previous: record.remain,
    };

    return (
        <FinalForm
            onSubmit={handlePurchase}
            initialValuesEqual={() => true}
            initialValue={initialValues}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onKeyDown={onKeyDown}
                    onSubmit={(event) => {
                        handleSubmit(event).then((data) => {
                            form.reset({
                                ...data,
                                previous: data.remain,
                                buy: 0,
                                fee: 0,
                                gallon: 0,
                                date: new Date().toLocaleDateString(),
                                time: new Date().toLocaleTimeString(),
                            });
                            setOpenReceipt(true);
                        });
                    }}>
                    <ChangeField values={values} record={record} />
                    <Form.Group>
                        <Account edit={edit} />
                        <MemberSince edit={edit} />
                        <PhoneNumber edit={edit} form={form} />
                        <FirstName edit={edit} />
                        <LastName edit={edit} />
                        <EditButton
                            edit={edit}
                            handleEdit={handleEdit}
                            values={values}
                            setEdit={setEdit}
                            setOpenReceipt={setOpenReceipt}
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
                                        first: record.first,
                                        last: record.last,
                                        phone: record.phone,
                                    });
                                    setEdit(false);
                                }}>
                                Cancel
                            </Form.Button>
                        )}
                        <TodayDate edit={edit} />
                        <CurrentTime edit={edit} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Buy edit={edit} />
                        <Remain edit={edit} remain={values.remain} />
                        <BuyButton
                            open={open}
                            setOpen={setOpen}
                            disabled={values.buy <= 0}
                            setOpenReceipt={setOpenReceipt}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <Fee edit={edit} />
                        <Renew edit={edit} />
                        <RenewButton
                            setOpenReceipt={setOpenReceipt}
                            disabled={values.gallon <= 0 || values.fee <= 0}
                        />
                    </Form.Group>
                    <Divider hidden />
                    <Divider />
                    <Form.Group>
                        <Form.Input type='hidden' width={14} />
                        <HistoryButton open={openHistoryModal} />
                        <DeleteButton open={openDelete} />
                        <DoneButton close={closeBuyScreen} />
                    </Form.Group>
                    <AdminModal
                        record={record}
                        open={openDeleteModal}
                        close={closeDelete}
                        deleteMembership={handleDeleteMembership}
                        adminPassword={adminPassword}
                        setAdminPassword={setAdminPassword}
                    />
                    <ConfirmModal
                        open={openConfirm}
                        record={record}
                        setOpen={setOpenConfirm}
                        setOpenReceipt={setOpenReceipt}
                    />
                </Form>
            )}
        />
    );
};

const ConfirmModal = ({ open, setOpen, record, setOpenReceipt }) => {
    return (
        <Modal
            basic
            dimmer='blurring'
            size='fullscreen'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Header>Purchase Record</Modal.Header>
            <Modal.Content>
                <Table size='large' celled inverted selectable color='blue'>
                    {record.type === 'NEW' && (
                        <NewReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                        />
                    )}
                    {record.type === 'BUY' && (
                        <BuyReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                            setOpenReceipt={setOpenReceipt}
                        />
                    )}
                    {record.type === 'RENEW' && (
                        <RenewReceipt
                            record={record}
                            open={open}
                            setOpen={setOpen}
                            setOpenReceipt={setOpenReceipt}
                        />
                    )}
                </Table>
            </Modal.Content>
        </Modal>
    );
};

const AdminModal = ({
    open,
    setOpenDeleteModal,
    record,
    setAdminPassword,
    deleteMembership,
    close,
}) => {
    return (
        <Modal
            basic
            // dimmer='blurring'
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            onClose={() => setOpenDeleteModal(false)}
            onOpen={() => setOpenDeleteModal(true)}
            open={open}>
            <Modal.Content>
                <Card fluid>
                    <Card.Content>
                        <Card.Header
                            content={record.first + ' ' + record.last}
                        />
                        <Card.Meta>
                            <span className='date'>
                                MemberSince {record.since}
                            </span>
                        </Card.Meta>
                        <Card.Description content={`Phone # ${record.phone}`} />
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />
                        Account: {record.account}
                    </Card.Content>
                </Card>
            </Modal.Content>
            <Modal.Actions>
                <Form>
                    <Form.Group>
                        <Form.Input type='hidden' width={8} />
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='enter password'
                            onChange={(event, data) => {
                                event.preventDefault();
                                setAdminPassword(data.value);
                            }}
                            width={5}
                        />
                        <Form.Button
                            type='button'
                            content='Delete'
                            color='red'
                            onClick={deleteMembership}
                        />
                        <Form.Button
                            color='black'
                            content='Cancel'
                            onClick={close}
                        />
                    </Form.Group>
                </Form>
            </Modal.Actions>
        </Modal>
    );
};

const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
        return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10
    )}`;
};

const normalizeAccount = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 11) return onlyNums;
    return onlyNums.slice(0, -1);
};

const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const normalizeGallon = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 5) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

const TodayDate = ({ edit }) => (
    <Field
        name='date'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                className='TodayDate'
                id='date'
                label='Today Date'
                size='huge'
                inverted
                iconPosition='left'
                icon='calendar'
                readOnly
                {...input}
                width={2}
            />
        )}
    />
);

const CurrentTime = ({ edit }) => (
    <Field
        name='time'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                className='TodayDate'
                width={2}
                id='time'
                label='Current Time'
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                {...input}
            />
        )}
    />
);

const MemberSince = ({ edit }) => (
    <Field
        name='since'
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                className='TodayDate'
                id='memberSince'
                label='Member Since'
                size='huge'
                icon='calendar'
                iconPosition='left'
                inverted
                readOnly
                width={2}
                {...input}
            />
        )}
    />
);

const Account = ({ edit }) => (
    <Field
        name='account'
        parse={normalizeAccount}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                id='account'
                size='huge'
                className='TodayDate'
                label='Account'
                {...input}
                icon='hashtag'
                iconPosition='left'
                inverted
                readOnly
                width={2}
            />
        )}
    />
);

const PhoneNumber = (props) => (
    <Field
        name='phone'
        parse={normalizePhone}
        format={normalizePhone}
        render={({ input }) => (
            <Form.Input
                id='phone'
                className='TodayDate'
                label='Phone Number'
                size='huge'
                width={3}
                icon='phone'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                {...input}
            />
        )}
    />
);

const FirstName = (props) => (
    <Field
        name='first'
        parse={normalize.name}
        render={({ input }) => (
            <Form.Input
                id='first'
                className='TodayDate'
                label='First Name'
                size='huge'
                icon='user'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                {...input}
                width={2}
            />
        )}
    />
);

const LastName = (props) => (
    <Field
        name='last'
        parse={normalize.name}
        render={({ input }) => (
            <Form.Input
                id='last'
                className='TodayDate'
                label='Last Name'
                size='huge'
                {...input}
                icon='user'
                iconPosition='left'
                inverted
                error={props.edit}
                readOnly={props.edit ? false : true}
                width={2}
            />
        )}
    />
);

const Buy = ({ edit }) => (
    <Field
        name='buy'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                className='TodayDate'
                id='buy'
                label='Buy'
                {...input}
                inverted
                size='huge'
                width={1}
            />
        )}
    />
);

const Remain = ({ edit, remain }) => (
    <Field
        name='remain'
        render={({ input }) => (
            <Form.Input
                error={remain <= 0 ? true : false}
                disabled={edit}
                className='TodayDate'
                inverted
                id='remain'
                label='Remain'
                readOnly
                {...input}
                size='huge'
                width={1}
            />
        )}
    />
);

const Fee = ({ edit }) => (
    <Field
        name='fee'
        parse={normalizeFee}
        render={({ input }) => (
            <Form.Input
                disabled={edit}
                className='TodayDate'
                id='fee'
                label='Fee'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

const Renew = ({ edit }) => (
    <Field
        name='gallon'
        parse={normalizeGallon}
        render={({ input }) => (
            <Form.Input
                id='renew'
                disabled={edit}
                className='TodayDate'
                label='Renew'
                {...input}
                size='huge'
                inverted
                width={1}
            />
        )}
    />
);

const WhenBuyFieldChanges = ({ field, becomes, set, to, reset }) => (
    <Field name={set} subscription={{}}>
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
    </Field>
);

const ChangeField = ({ values, record }) => (
    <>
        <WhenBuyFieldChanges
            field='buy'
            becomes={values.buy > 0}
            set='remain'
            to={parseInt(values.remain - values.buy)}
            reset={record.remain}
        />
        <WhenBuyFieldChanges
            field='buy'
            becomes={values.buy !== 0}
            set='remain'
            to={parseInt(record.remain - values.buy)}
            reset={record.remain}
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
    </>
);

/***
 * BUTTONS:
 */
const HistoryButton = ({ open }) => (
    <Form.Button
        type='button'
        size='huge'
        color='teal'
        content='History'
        onClick={open}
    />
);

const DoneButton = ({ close }) => (
    <Form.Button size='huge' color='black' content='Done' onClick={close} />
);

const DeleteButton = ({ open }) => (
    <Form.Button
        floated='left'
        size='huge'
        negative
        onClick={open}
        content='Delete'
    />
);

const RenewButton = ({ disabled, setOpenReceipt }) => (
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

const BuyButton = ({ disabled, setOpenReceipt }) => (
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

const EditButton = ({ values, setEdit, edit, handleEdit, setOpenReceipt }) => (
    <Form.Button
        type='button'
        disabled={
            !values.first ||
            !values.last ||
            !values.phone ||
            values.phone.length < 14
        }
        content={edit ? 'Save' : 'Edit'}
        color={edit ? 'google plus' : 'vk'}
        size='huge'
        style={{ marginTop: '30px' }}
        onClick={(e) => {
            e.preventDefault();
            console.log('Edit', values);
            if (edit) {
                setOpenReceipt(false);
                handleEdit(values)
                    .then((data) => {
                        setOpenReceipt(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            setEdit((prevEdit) => !prevEdit);
        }}
    />
);

const BuyScreen = (props) => {
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState(props.location.state.history);
    const [record, setRecord] = useState(props.location.state.record);
    const [edit, setEdit] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');

    const openDelete = (e) => {
        e.preventDefault();
        setOpenDeleteModal(true);
    };

    const closeDelete = (e) => {
        e.preventDefault();
        setOpenDeleteModal(false);
    };

    useEffect(() => {
        if (!props.location.state) {
            props.history.push('/dashboard');
        } else {
            setOpen(true);
        }
    }, [history, props]);

    // PREVENT ENTER TO SUBMIT FORM
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    /**
     * FORM SUBMIT: BUY AND RENEW
     * @param {*} values
     * @returns
     */
    const handlePurchase = async (values) => {
        console.log('handlePurchase', values);
        try {
            if (values.gallon !== 0 && values.fee !== 0) {
                const { history } = await renew(values);
                const lastRecord = history[history.length - 1];
                setRecord(lastRecord);
                setHistory(history);
                setOpenConfirm(true);
                return lastRecord;
            } else {
                const { history } = await buy(values);
                console.log(history[history.length - 1]);
                const lastRecord = history[history.length - 1];
                setRecord(lastRecord);
                setHistory(history);
                setOpenConfirm(true);
                return lastRecord;
            }
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * DELETE MEMBERSHIP
     */
    const handleDeleteMembership = async () => {
        try {
            const { auth } = await deleteMembership({
                account: record.account,
                password: adminPassword,
            });

            if (auth) {
                console.log({ auth });
                props.history.push('/dashboard');
            }
        } catch (err) {
            setOpenDeleteModal(true);
            setAdminPassword('');
        }
    };

    const handleEdit = async (values) => {
        try {
            const data = await editMembership(values);
            console.log('handleEdit Look Here', data);
            setRecord(data[data.length - 1]);
            setHistory(data);
            return data;
        } catch (err) {
            return console.log(err);
        }
    };

    const openHistoryModal = (e) => {
        e.preventDefault();
        setOpenHistory(true);
    };

    const closeBuyScreen = (e) => {
        e.preventDefault();
        props.history.push('/dashboard');
    };

    return (
        <TransitionablePortal
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid
                    verticalAlign='top'
                    style={{ height: '100vh', backgroundColor: '#002b487d' }}>
                    <Grid.Column
                        style={{
                            backgroundColor: '#002b487d',
                        }}>
                        <Receipt
                            open={openReceipt}
                            record={record}
                            setOpen={() => {}}
                        />
                        <Divider />

                        <FinalForm
                            onSubmit={handlePurchase}
                            initialValuesEqual={() => true}
                            initialValues={{
                                ...record,
                                date: new Date().toLocaleDateString(),
                                time: new Date().toLocaleTimeString(),
                                buy: 0,
                                fee: 0,
                                type: 'BUY',
                                gallon: 0,
                                previous: record.remain,
                            }}
                            render={({ handleSubmit, form, values }) => (
                                <Form
                                    onKeyDown={onKeyDown}
                                    onSubmit={(event) => {
                                        handleSubmit(event).then((data) => {
                                            form.reset({
                                                ...data,
                                                previous: data.remain,
                                                buy: 0,
                                                fee: 0,
                                                gallon: 0,
                                                date: new Date().toLocaleDateString(),
                                                time: new Date().toLocaleTimeString(),
                                            });
                                            setOpenReceipt(true);
                                        });
                                    }}>
                                    <ChangeField
                                        values={values}
                                        record={record}
                                    />
                                    <Form.Group>
                                        <Account edit={edit} />
                                        <MemberSince edit={edit} />
                                        <PhoneNumber edit={edit} form={form} />
                                        <FirstName edit={edit} />
                                        <LastName edit={edit} />
                                        <EditButton
                                            edit={edit}
                                            handleEdit={handleEdit}
                                            values={values}
                                            setEdit={setEdit}
                                            setOpenReceipt={setOpenReceipt}
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
                                                        first: record.first,
                                                        last: record.last,
                                                        phone: record.phone,
                                                    });
                                                    setEdit(false);
                                                }}>
                                                Cancel
                                            </Form.Button>
                                        )}
                                        <TodayDate edit={edit} />
                                        <CurrentTime edit={edit} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input type='hidden' width={14} />
                                        <Buy edit={edit} />
                                        <Remain
                                            edit={edit}
                                            remain={values.remain}
                                        />
                                        <BuyButton
                                            disabled={values.buy <= 0}
                                            setOpenReceipt={setOpenReceipt}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input type='hidden' width={14} />
                                        <Fee edit={edit} />
                                        <Renew edit={edit} />
                                        <RenewButton
                                            setOpenReceipt={setOpenReceipt}
                                            disabled={
                                                values.gallon <= 0 ||
                                                values.fee <= 0
                                            }
                                        />
                                    </Form.Group>
                                    <Divider hidden />
                                    <Divider />
                                    <Form.Group>
                                        <Form.Input type='hidden' width={14} />
                                        <HistoryButton
                                            open={openHistoryModal}
                                        />
                                        <DeleteButton open={openDelete} />
                                        <DoneButton close={closeBuyScreen} />
                                    </Form.Group>
                                    <AdminModal
                                        record={record}
                                        open={openDeleteModal}
                                        close={closeDelete}
                                        deleteMembership={
                                            handleDeleteMembership
                                        }
                                        adminPassword={adminPassword}
                                        setAdminPassword={setAdminPassword}
                                    />
                                    <ConfirmModal
                                        open={openConfirm}
                                        record={record}
                                        setOpen={setOpenConfirm}
                                        setOpenReceipt={setOpenReceipt}
                                    />
                                </Form>
                            )}
                        />
                        <CustomerHistory
                            records={history}
                            open={openHistory}
                            setOpenHistory={setOpenHistory}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default BuyScreen;
