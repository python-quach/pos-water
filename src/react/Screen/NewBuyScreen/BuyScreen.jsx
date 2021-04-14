import { useEffect, useState } from 'react';
import {
    TransitionablePortal,
    Segment,
    Header,
    Table,
    Transition,
    Form,
    Divider,
    Icon,
    Modal,
    Button,
    Pagination,
    Step,
    Label,
} from 'semantic-ui-react';
import { api, mckeeApi } from '../../../api/api';
import { Form as FinalForm, Field } from 'react-final-form';
export const normalizeName = (value) => {
    if (!value) return value;
    const onlyWords = value.replace(/[^A-Za-z]/g, '');
    return onlyWords.toUpperCase();
};
export const normalizeGallon = (value) => {
    if (!value) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 6) return parseInt(onlyNums);
    return parseInt(onlyNums.slice(0, 5));
};

export const normalizeAreaCode = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 4) return onlyNums;
    return onlyNums.slice(0, 3);
};
export const required = (value) => (value ? undefined : 'Required');
export const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined;
export const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const composeValidators = (...validators) => (value) =>
    validators.reduce(
        (error, validator) => error || validator(value),
        undefined
    );
export const normalizeFee = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};
export const normalizePhone = (value) => {
    if (!value) return value;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 6) return onlyNums;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
};
export const normalizeRenewAmount = (value) => {
    if (isNaN(parseInt(value))) return 0;
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length < 7) {
        return parseInt(onlyNums);
    } else {
        return parseInt(onlyNums.substring(0, onlyNums.length - 1));
    }
};

// RECEIPT HEADER
export const Receipt = ({ visible, receipt }) => (
    <Transition visible={visible} animation='vertical flip' duration={800}>
        <Header.Content>
            <Table celled selectable size='large'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Record ID</Table.HeaderCell>
                        <Table.HeaderCell>Account</Table.HeaderCell>
                        <Table.HeaderCell>Member Since</Table.HeaderCell>
                        <Table.HeaderCell>Full Name</Table.HeaderCell>
                        <Table.HeaderCell>Area Code</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Fee</Table.HeaderCell>
                        <Table.HeaderCell>Renew</Table.HeaderCell>
                        <Table.HeaderCell>Previous</Table.HeaderCell>
                        <Table.HeaderCell>Buy</Table.HeaderCell>
                        <Table.HeaderCell>Remain</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{receipt.record_id}</Table.Cell>
                        <Table.Cell>{receipt.account}</Table.Cell>
                        <Table.Cell>{receipt.memberSince}</Table.Cell>
                        <Table.Cell>{receipt.fullname}</Table.Cell>
                        <Table.Cell>{receipt.areaCode}</Table.Cell>
                        <Table.Cell>{receipt.phone}</Table.Cell>
                        <Table.Cell>${receipt.fee}</Table.Cell>
                        <Table.Cell>{receipt.renew || 0}</Table.Cell>
                        <Table.Cell>{receipt.prev}</Table.Cell>
                        <Table.Cell>{receipt.buy || 0}</Table.Cell>
                        <Table.Cell>{receipt.remain}</Table.Cell>
                        <Table.Cell>{receipt.invoiceDate}</Table.Cell>
                        <Table.Cell>{receipt.invoiceTime}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Header.Content>
    </Transition>
);
export const BuyReceiptModal = ({ open, record, openModal }) => (
    <Modal dimmer='blurring' open={open}>
        <Segment raised secondary>
            <Modal.Header>
                <Header as='h1' size='huge' textAlign='left' color='blue'>
                    <Icon name='braille' color='blue' />
                    <Header.Content>
                        Mckee Pure Water
                        <Header.Subheader>
                            {record.fullname} - {record.phone}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Modal.Header>
        </Segment>
        <Segment raised tertiary basic color='blue'>
            <Modal.Content image>
                <Modal.Description>
                    <Step.Group widths={3} size='huge'>
                        <Step active>
                            <Step.Content>
                                <Step.Title>Prev: {record.prev}</Step.Title>
                            </Step.Content>
                        </Step>
                        <Step completed>
                            <Step.Content>
                                <Step.Title>Buy: {record.buy}</Step.Title>
                            </Step.Content>
                        </Step>
                        <Step>
                            <Step.Content>
                                <Step.Title>Remain: {record.remain}</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Modal.Description>
            </Modal.Content>
        </Segment>
        <Modal.Actions>
            <Button
                content='Close'
                size='huge'
                color='black'
                onClick={() => {
                    openModal(false);
                    document.getElementById('buy').focus();
                }}
            />
            <Button
                content='Print'
                size='huge'
                positive
                icon='print'
                labelPosition='right'
                onClick={() => {
                    openModal(false);
                    document.getElementById('buy').focus();
                }}
            />
        </Modal.Actions>
    </Modal>
);
export const RenewReceiptModal = ({ open, record, openModal }) => (
    <Modal dimmer='blurring' open={open}>
        <Segment raised secondary>
            <Modal.Header>
                <Header as='h1' size='huge' textAlign='left' color='blue'>
                    <Icon name='braille' color='blue' />
                    <Header.Content>
                        Mckee Pure Water
                        <Header.Subheader>
                            {record.fullname} - {record.phone}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Modal.Header>
        </Segment>
        <Segment raised tertiary basic color='blue'>
            <Modal.Content image>
                <Modal.Description>
                    <Step.Group widths={4} size='huge'>
                        <Step active>
                            <Step.Content>
                                <Step.Title>Fee: ${record.fee}</Step.Title>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Step.Content>
                                <Step.Title>
                                    Renew: {record.renew || 0}
                                </Step.Title>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Step.Content>
                                <Step.Title>Prev: {record.prev}</Step.Title>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Step.Content>
                                <Step.Title>Remain: {record.remain}</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Modal.Description>
            </Modal.Content>
        </Segment>
        <Modal.Actions>
            <Button
                size='huge'
                color='black'
                onClick={() => {
                    openModal(false);
                    document.getElementById('buy').focus();
                }}>
                Close
            </Button>
            <Button
                size='huge'
                content='Print'
                labelPosition='right'
                icon='print'
                onClick={() => openModal(false)}
                positive
            />
        </Modal.Actions>
    </Modal>
);

const cellData = [
    'Record',
    'Account',
    'Since',
    'Phone',
    'Fullname',
    'Fee',
    'Renew',
    'Prev',
    'Buy',
    'Remain',
    'Date',
    'Time',
];

// HISTORY: MODAL
export const HistoryModal = ({
    open,
    openModal,
    records,
    activePage,
    onChange,
    totalPages,
    totalFee,
    totalRenew,
    totalBuy,
}) =>
    records && (
        <Modal dimmer='blurring' size='fullscreen' open={open}>
            <Modal.Header>
                <Label as='a' color='blue' image size='large'>
                    Total Fee
                    <Label.Detail>${totalFee}</Label.Detail>
                </Label>
                <Label as='a' color='teal' image size='large'>
                    Total Renew
                    <Label.Detail>{totalRenew}</Label.Detail>
                </Label>
                <Label as='a' color='yellow' image size='large'>
                    Total Buy
                    <Label.Detail>{totalBuy}</Label.Detail>
                </Label>
            </Modal.Header>
            <Modal.Content image>
                <Table celled selectable striped color='teal' size='large'>
                    <Table.Header>
                        <Table.Row>
                            {cellData.map((item, index) => (
                                <Table.HeaderCell content={item} key={index} />
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {records.map((record, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell content={record.record_id} />
                                    <Table.Cell content={record.account} />
                                    <Table.Cell content={record.memberSince} />
                                    <Table.Cell
                                        content={
                                            record.areaCode + '-' + record.phone
                                        }
                                    />
                                    <Table.Cell content={record.fullname} />
                                    <Table.Cell
                                        content={
                                            record.fee && record.renew
                                                ? record.fee
                                                : 0
                                        }
                                        style={{ color: 'green' }}
                                        icon='dollar'
                                    />
                                    <Table.Cell
                                        style={{ color: 'blue' }}
                                        content={record.renew || 0}
                                    />
                                    <Table.Cell
                                        content={
                                            record.renew
                                                ? record.remain - record.renew
                                                : record.prev
                                        }
                                    />
                                    <Table.Cell content={record.buy || 0} />
                                    <Table.Cell content={record.remain} />
                                    <Table.Cell content={record.invoiceDate} />
                                    <Table.Cell content={record.invoiceTime} />
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Modal.Content>
            <Modal.Actions>
                <Pagination
                    activePage={activePage}
                    onPageChange={onChange}
                    totalPages={Math.ceil(totalPages / 10)}
                    ellipsisItem={null}
                />
                <Button color='black' onClick={() => openModal(false)}>
                    Done
                </Button>
            </Modal.Actions>
        </Modal>
    );

// EDIT: Membership Info Fields
export const Account = ({ disabled }) =>
    !disabled && (
        <Field
            name='account'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='account'
                    label='Account'
                    className='BuyAccount'
                    placeholder='xxxxxxxxx'
                    icon='hashtag'
                    iconPosition='left'
                    readOnly
                    inverted
                    disabled={disabled}
                    width={2}
                />
            )}
        />
    );
export const Since = ({ disabled }) =>
    !disabled && (
        <Field
            name='memberSince'
            render={({ input }) => (
                <Form.Input
                    {...input}
                    id='memberSince'
                    label='Member Since'
                    className='TodayDate'
                    placeholder='mm/dd/yyy'
                    icon='calendar'
                    iconPosition='left'
                    readOnly
                    inverted
                    disabled={disabled}
                    width={2}
                />
            )}
        />
    );
export const AreaCode = ({ error, readOnly, parse, validate }) => (
    <Field
        name='areaCode'
        parse={parse}
        validate={validate}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='areaCode'
                className='AreaCode'
                label='Area Code'
                inverted
                placeholder='xxx'
                error={error}
                readOnly={readOnly}
                width={1}
            />
        )}
    />
);
export const Phone = ({ error, readOnly, parse }) => (
    <Field
        name='phone'
        parse={parse}
        render={({ input }) => (
            <Form.Input
                id='phone'
                className='PhoneNumber'
                label='Phone Number'
                placeholder='xxx-xxxx'
                inverted
                error={error}
                readOnly={readOnly}
                width={2}
                {...input}
            />
        )}
    />
);
export const FirstName = ({ error, readOnly, parse }) => (
    <Field
        name='firstName'
        parse={parse}
        render={({ input }) => (
            <Form.Input
                {...input}
                id='firstName'
                label='First Name'
                placeholder={input.value || ''}
                className='Name'
                inverted
                error={error}
                readOnly={readOnly}
                width={2}
            />
        )}
    />
);
export const LastName = ({ error, readOnly, parse }) => (
    <Field
        name='lastName'
        parse={parse}
        render={({ input }) => (
            <Form.Input
                {...input}
                label='Last Name'
                placeholder='last name'
                className='Name'
                readOnly={readOnly}
                error={error}
                inverted
                width={2}
            />
        )}
    />
);
export const TodayDate = ({ disabled }) =>
    !disabled && (
        <Field
            name='invoiceDate'
            render={({ input }) => (
                <Form.Input
                    width={2}
                    id='todayDate'
                    label='Today Date'
                    className='TodayDate'
                    placeholder='mm/dd/yyyy'
                    icon='calendar'
                    iconPosition='left'
                    inverted
                    readOnly
                    disabled={disabled}
                    {...input}
                />
            )}
        />
    );

export const CurrentTime = ({ disabled }) =>
    !disabled && (
        <Field
            name='invoiceTime'
            render={({ input }) => (
                <Form.Input
                    id='time'
                    label='Current Time'
                    className='TodayDate'
                    placeholder='00:00:00 PM'
                    icon='time'
                    iconPosition='left'
                    inverted
                    readOnly
                    {...input}
                    disabled={disabled}
                    width={2}
                />
            )}
        />
    );

export const Cancel = ({ edit, visible, onClick, style }) =>
    edit && (
        <Transition
            visible={visible}
            unmountOnHide
            animation='pulse'
            duration='500'>
            <Form.Button
                type='button'
                content='Cancel'
                color='black'
                size='huge'
                style={style}
                onClick={onClick}
            />
        </Transition>
    );

// BUY SCREEN:
export const BuyScreen = ({ history }) => {
    const [open, setOpen] = useState(
        history.location.state ? history.location.state.open : false
    );
    const [record, setRecord] = useState(
        history.location.state ? history.location.state.record : {}
    );
    const [visible, setVisible] = useState(false);
    const [cancelButton, setCancelButton] = useState(false);
    const [edit, setEdit] = useState(false);
    const [buyButton, setBuyButton] = useState(false);
    const [renewButton, setRenewButton] = useState(false);
    const [openHistoryModal, setOpenHistoryModal] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [openRenewModal, setOpenRenewModal] = useState(false);

    // History Page
    const [records, setRecords] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [totalRenew, setTotalRenew] = useState(0);
    const [totalBuy, setTotalBuy] = useState(0);

    // Pagination
    const [totalPages, setTotalPages] = useState(0);
    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const onChange = (_, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setOffset(pageInfo.activePage * 10 - 10);
    };

    const updateHistoryPage = (data) => {
        const { total, history, totalRenewalFee, totalRenew, totalBuy } = data;

        if (total) setTotalPages(total);
        setRecords(history);
        setTotalFee(totalRenewalFee);
        setTotalRenew(totalRenew);
        setTotalBuy(totalBuy);
    };

    const cancelEdit = (form, initialValues, values) =>
        form.batch(() => {
            form.initialize({
                ...initialValues,
                buy: values.buy,
                remain: values.remain,
                fee: values.fee,
                renew: values.renew,
            });
            setEdit((prev) => !prev);
            setCancelButton((prev) => !prev);
            document.getElementById('buy').focus();
        });

    const renewMembership = async (values) => {
        const { account, memberSince } = values;
        const renewData = {
            ...values,
            buy: null,
            prev: values.remain,
            remain: values.renew + values.remain,
        };
        try {
            const newReceipt = await mckeeApi.renew(renewData);
            const records = await mckeeApi.everything({
                account,
                memberSince,
                limit: 10,
                offset: offset,
            });

            setRecord(newReceipt);
            setOpenRenewModal(true);
            updateHistoryPage({ ...records });
            return newReceipt;
        } catch (err) {
            throw err;
        }
    };

    const buyWater = async (values) => {
        const { account, memberSince } = values;
        const buyData = {
            ...values,
            renew: null,
            prev: values.remain,
            remain: values.remain - values.buy,
        };
        try {
            const newReceipt = await mckeeApi.buy(buyData);
            const records = await mckeeApi.everything({
                account,
                memberSince,
                limit: 10,
                offset: offset,
            });

            setRecord(newReceipt);
            setOpenBuyModal(true);
            updateHistoryPage({ ...records });
            return newReceipt;
        } catch (err) {
            throw err;
        }
    };

    const onSubmit = async (values) => {
        try {
            const data = values.buy
                ? await buyWater(values)
                : await renewMembership(values);
            return data;
        } catch (err) {
            return console.log(err);
        }
    };

    const resetOffset = () => {
        setOffset(0);
        setActivePage(1);
        setTotalPages(0);
    };

    useEffect(() => {
        if (!history.location.state) {
            history.push('/dashboard');
        } else {
            setVisible(false);
            setVisible(true);
        }
    }, [history]);

    useEffect(() => {
        if (!history.location.state) {
            history.push('/dashboard');
        } else {
            const getTotalInvoice = async () => {
                const { account, memberSince } = record;
                try {
                    const total = await mckeeApi.totalInvoices({
                        account,
                        memberSince,
                    });
                    const records = await mckeeApi.everything({
                        account,
                        memberSince,
                        limit: 10,
                        offset: offset,
                    });

                    updateHistoryPage({ ...records, total: total });
                } catch (err) {
                    return console.log(err);
                }
            };

            if (!totalPages) getTotalInvoice();
        }
    }, [totalPages, setTotalPages, offset, record, history]);

    useEffect(() => {
        if (!history.location.state) {
            history.push('/dashboard');
        } else {
            const getTotalInvoice = async () => {
                try {
                    const response = await mckeeApi.everything({
                        account: record.account,
                        memberSince: record.memberSince,
                        limit: 10,
                        offset: offset,
                    });

                    updateHistoryPage(response);
                } catch (err) {
                    return console.log(err);
                }
            };

            openHistoryModal ? getTotalInvoice() : resetOffset();
        }
    }, [offset, openHistoryModal, history, record]);

    useEffect(() => {
        const buy = document.getElementById('buy');
        if (buy) buy.focus();
    }, []);

    return (
        <TransitionablePortal
            open={open}
            closeOnDocumentClick={false}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            closeOnPortalMouseLeave={false}
            transition={{ animation: 'fade', duration: 500 }}>
            <Segment
                style={{
                    zIndex: 1000,
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#002b487d',
                }}>
                <Header as='h1' inverted size='huge' textAlign='left'>
                    <Icon name='braille' color='blue' />
                    <Header.Content>
                        Mckee Pure Water
                        <Header.Subheader content='Customer Purchase Screen' />
                    </Header.Content>
                </Header>
                <Divider />
                <Divider hidden />
                <Receipt visible={visible} receipt={record} />
                <Divider hidden />
                <FinalForm
                    initialValues={{
                        ...record,
                        record_id: record.record_id + 1,
                        renew: 0,
                        buy: 0,
                        fee: 0,
                        invoiceDate: new Date().toLocaleDateString(),
                        invoiceTime: new Date().toLocaleTimeString(),
                    }}
                    initialValuesEqual={() => true}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, initialValues, values, form }) => (
                        <Form
                            size='huge'
                            onSubmit={(event) =>
                                handleSubmit(event).then((data) => {
                                    form.initialize({
                                        ...data,
                                        record_id: data.record_id + 1,
                                        fee: 0,
                                        renew: 0,
                                        buy: 0,
                                        invoiceDate: new Date().toLocaleDateString(),
                                        invoiceTime: new Date().toLocaleTimeString(),
                                    });
                                    // document.getElementById('buy').focus();
                                })
                            }>
                            <Form.Group>
                                <Account disabled={edit} />
                                <Since disabled={edit} />
                                <AreaCode
                                    error={edit}
                                    readOnly={!edit}
                                    parse={normalizeAreaCode}
                                    validate={composeValidators(
                                        required,
                                        mustBeNumber,
                                        minValue(3)
                                    )}
                                />
                                <Phone
                                    error={edit}
                                    readOnly={!edit}
                                    parse={normalizePhone}
                                />
                                <FirstName
                                    error={edit}
                                    readOnly={!edit}
                                    parse={normalizeName}
                                />
                                <LastName
                                    error={edit}
                                    readOnly={!edit}
                                    parse={normalizeName}
                                />
                                <TodayDate disabled={edit} />
                                <CurrentTime disabled={edit} />

                                <Transition
                                    visible={!edit}
                                    animation='pulse'
                                    duration='500'>
                                    <Form.Button
                                        type='button'
                                        content={edit ? 'Save' : 'Edit'}
                                        color={edit ? 'google plus' : 'vk'}
                                        size='huge'
                                        style={{
                                            width: '140px',
                                            marginTop: '30px',
                                        }}
                                        disabled={
                                            values.areaCode && values.phone
                                                ? values.areaCode.length < 3 ||
                                                  values.phone.length < 8
                                                : true
                                        }
                                        onClick={() => {
                                            if (edit) {
                                                form.batch(() => {
                                                    form.initialize({
                                                        ...values,
                                                        fullname:
                                                            values.firstName +
                                                            ' ' +
                                                            values.lastName,
                                                    });
                                                    setRecord({
                                                        ...values,
                                                        fullname:
                                                            values.firstName +
                                                            ' ' +
                                                            values.lastName,
                                                    });
                                                    const data = {
                                                        ...values,
                                                        fullname:
                                                            values.firstName +
                                                            ' ' +
                                                            values.lastName,
                                                    };
                                                    api.edit(data, (result) => {
                                                        setRecord(result);
                                                        setEdit(false);
                                                    });
                                                });
                                            }
                                            setEdit((prev) => !prev);
                                            setCancelButton((prev) => !prev);
                                        }}
                                    />
                                </Transition>
                                <Cancel
                                    edit={edit}
                                    visible={cancelButton}
                                    style={{
                                        width: '140px',
                                        marginTop: '30px',
                                    }}
                                    onClick={() =>
                                        cancelEdit(form, initialValues, values)
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Field
                                    name='hidden'
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            width={13}
                                            type='hidden'
                                        />
                                    )}
                                />
                                <Field
                                    name='buy'
                                    parse={normalizeGallon}
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            id='buy'
                                            label='Buy'
                                            className='AreaCode'
                                            inverted
                                            onFocus={() => {
                                                form.batch(() => {
                                                    form.change('fee', 0);
                                                    form.change('renew', 0);
                                                });
                                            }}
                                            width={1}
                                        />
                                    )}
                                />
                                <Field
                                    name='remain'
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            id='remain'
                                            className='AreaCode'
                                            label='Remain'
                                            inverted
                                            readOnly
                                            error={values.remain < 0}
                                            width={1}
                                        />
                                    )}
                                />
                                <Transition
                                    visible={!buyButton}
                                    animation='pulse'
                                    duration='500'>
                                    <Form.Button
                                        disabled={edit || values.buy === 0}
                                        content='Buy'
                                        size='huge'
                                        color='green'
                                        style={{
                                            width: '140px',
                                            marginTop: '30px',
                                        }}
                                        onClick={() => {
                                            setBuyButton((prev) => !prev);
                                            // setOpenBuyModal(true);
                                        }}
                                    />
                                </Transition>
                            </Form.Group>
                            <Form.Group>
                                <Field
                                    name='hidden'
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            width={13}
                                            type='hidden'
                                        />
                                    )}
                                />
                                <Field
                                    name='fee'
                                    parse={normalizeFee}
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            id='renew'
                                            label='Fee'
                                            className='AreaCode'
                                            inverted
                                            onFocus={() =>
                                                form.change('buy', 0)
                                            }
                                            width={1}
                                        />
                                    )}
                                />
                                <Field
                                    name='renew'
                                    parse={normalizeRenewAmount}
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            label='Gallon'
                                            className='AreaCode'
                                            inverted
                                            onKeyPress={(e) =>
                                                (e.key === 'Enter' ||
                                                    e.keyCode === 13) &&
                                                values.fee > 0 &&
                                                values.renew > 0
                                                    ? form
                                                          .submit()
                                                          .then((data) => {
                                                              form.batch(() => {
                                                                  setRenewButton(
                                                                      (prev) =>
                                                                          !prev
                                                                  );
                                                                  form.initialize(
                                                                      {
                                                                          ...data,
                                                                          record_id:
                                                                              data.record_id +
                                                                              1,
                                                                          fee: 0,
                                                                          renew: 0,
                                                                          buy: 0,
                                                                          invoiceDate: new Date().toLocaleDateString(),
                                                                          invoiceTime: new Date().toLocaleTimeString(),
                                                                      }
                                                                  );
                                                              });
                                                          })
                                                    : null
                                            }
                                            width={1}
                                        />
                                    )}
                                />
                                <Transition
                                    visible={!renewButton}
                                    animation='pulse'
                                    duration='500'>
                                    <Form.Button
                                        type='submit'
                                        content='Renew'
                                        size='huge'
                                        color='blue'
                                        disabled={
                                            edit ||
                                            values.fee === 0 ||
                                            values.renew === 0
                                        }
                                        style={{
                                            width: '140px',
                                            marginTop: '30px',
                                        }}
                                        onClick={() => {
                                            setRenewButton((prev) => !prev);
                                        }}
                                    />
                                </Transition>
                            </Form.Group>
                            <Divider />
                            <Form.Group>
                                <Field
                                    name='hidden'
                                    render={({ input }) => (
                                        <Form.Input
                                            {...input}
                                            width={14}
                                            type='hidden'
                                        />
                                    )}
                                />
                                <Form.Button
                                    type='button'
                                    content='History'
                                    size='huge'
                                    floated='right'
                                    color='teal'
                                    style={{
                                        width: '140px',
                                        marginTop: '10px',
                                    }}
                                    onClick={() => setOpenHistoryModal(true)}
                                />
                                <Form.Button
                                    type='button'
                                    content='Done'
                                    color='black'
                                    size='huge'
                                    style={{
                                        width: '140px',
                                        marginTop: '10px',
                                    }}
                                    onClick={() => {
                                        setOpen(() => {
                                            history.push('/dashboard');
                                            return false;
                                        });
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    )}
                />
                <HistoryModal
                    open={openHistoryModal}
                    openModal={setOpenHistoryModal}
                    records={records}
                    onChange={onChange}
                    totalPages={totalPages}
                    activePage={activePage}
                    totalFee={totalFee}
                    totalRenew={totalRenew}
                    totalBuy={totalBuy}
                />
                <BuyReceiptModal
                    open={openBuyModal}
                    openModal={setOpenBuyModal}
                    record={record}
                />
                <RenewReceiptModal
                    open={openRenewModal}
                    openModal={setOpenRenewModal}
                    record={record}
                />
            </Segment>
        </TransitionablePortal>
    );
};

export default BuyScreen;
