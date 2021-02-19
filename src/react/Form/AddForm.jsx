import { useState } from 'react';
import {
    Segment,
    TransitionablePortal,
    Header,
    Form,
    Button,
} from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { add, find, lastRecord, print } from '../../api/api';
import { currentTime, currentDate } from '../../helpers/helpers';

const AddForm = ({ history, initialValues, record }) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [printReceipt, setPrintReceipt] = useState(null);

    const onSubmit = async (data) => {
        const { phone, firstName, lastName, renew } = data;
        console.log(phone);
        add(
            {
                ...data,
                fullname: firstName + ' ' + lastName,
                threeDigit: phone.slice(0, 3),
                fourDigit: phone.slice(4, 8),
                prev: renew,
                renew: null,
                buy: 0,
                remain: renew,
            },
            (response) => {
                if (response.error) {
                    setError(true);
                    setErrorMessage(response.error);
                } else {
                    find({ account: data.account }, (data) => {
                        lastRecord(({ record_id }) => {
                            console.log({ data, record_id });

                            // Open Print option and disable Done
                            setPrintReceipt({
                                ...data,
                                newRecordID: record_id,
                            });
                            setOpen(true);

                            // history.push({
                            //     pathname: '/buy',
                            //     state: {
                            //         ...data.membership,
                            //         newRecordID: record_id,
                            //     },
                            // });
                        });
                    });
                }
            }
        );
    };

    return (
        <>
            <FinalForm
                initialValuesEqual={() => true}
                onSubmit={onSubmit}
                initialValues={{
                    record_id: record,
                    areaCode: '',
                    phone: '',
                    firstName: '',
                    lastName: '',
                    memberSince: currentDate(),
                    account: '',
                    fee: 0,
                    prev: 0,
                    buy: 0,
                    renew: 0,
                    invoiceDate: currentDate(),
                    invoiceTime: currentTime(),
                }}
                render={({ handleSubmit, form, values, initialValues }) => (
                    <Form
                        // size='tiny'
                        size='massive'
                        onSubmit={(event) => {
                            // setOriginal(values);
                            // updateForm(form);
                            handleSubmit(event).then(() => {
                                console.log('form submit', error, values);
                                // if (error) {
                                //     form.initialize(values);
                                // }
                            });
                        }}>
                        <Form.Group>
                            <Form.Input type='hidden' width={12} />
                            <Field
                                name='invoiceDate'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='todayDate'
                                        label='Today Date'
                                        className='TodayDate'
                                        placeholder='mm/dd/yyyy'
                                        icon='calendar'
                                        iconPosition='left'
                                        inverted
                                        readOnly
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='invoiceTime'
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        label='Current Time'
                                        className='TodayDate'
                                        placeholder='00:00:00 PM'
                                        icon='time'
                                        iconPosition='left'
                                        inverted
                                        readOnly
                                        width={2}
                                    />
                                )}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Field
                                name='account'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length < 10) return onlyNums;
                                    return parseInt(onlyNums.slice(0, 9));
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='account'
                                        error={error ? errorMessage : false}
                                        label='Account'
                                        className='BuyAccount'
                                        placeholder='xxxxxx'
                                        icon='hashtag'
                                        iconPosition='left'
                                        inverted
                                        width={2}
                                        onFocus={() => {
                                            setError(false);
                                            setErrorMessage('');
                                        }}
                                    />
                                )}
                            />
                            <Field
                                name='areaCode'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length < 4) return onlyNums;
                                    return onlyNums.slice(0, 3);
                                }}
                                render={({ input, meta }) => (
                                    <Form.Input
                                        {...input}
                                        id='areaCode'
                                        className='AreaCode'
                                        label='Area Code'
                                        inverted
                                        placeholder='xxx'
                                        width={1}
                                    />
                                )}
                            />
                            <Field
                                name='phone'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length <= 6) return onlyNums;
                                    return `${onlyNums.slice(
                                        0,
                                        3
                                    )}-${onlyNums.slice(3, 7)}`;
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='phone'
                                        className='PhoneNumber'
                                        label='Phone Number'
                                        placeholder='xxx-xxxx'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='firstName'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyWords = value.replace(
                                        /[^A-Za-z]/g,
                                        ''
                                    );
                                    return onlyWords.toUpperCase();
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='firstName'
                                        label='First Name'
                                        placeholder='First Name'
                                        className='Name'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Field
                                name='lastName'
                                parse={(value) => {
                                    if (!value) return value;
                                    const onlyWords = value.replace(
                                        /[^A-Za-z]/g,
                                        ''
                                    );
                                    return onlyWords.toUpperCase();
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='lastName'
                                        label='Last Name'
                                        placeholder='Last Name'
                                        className='Name'
                                        inverted
                                        width={2}
                                    />
                                )}
                            />
                            <Form.Input type='hidden' width={4} />
                            <Field
                                name='fee'
                                parse={(value) => {
                                    if (isNaN(parseInt(value))) return 0;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );
                                    if (onlyNums.length < 5) {
                                        return parseInt(onlyNums);
                                    } else {
                                        return parseInt(
                                            onlyNums.substring(
                                                0,
                                                onlyNums.length - 1
                                            )
                                        );
                                    }
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        id='renew'
                                        label='Fee'
                                        className='AreaCode'
                                        inverted
                                        width={1}
                                    />
                                )}
                            />
                            <Field
                                name='renew'
                                parse={(value) => {
                                    // if (!value) return '0';
                                    // if (!value) return values;
                                    if (isNaN(parseInt(value))) return 0;
                                    // if (!value) return 0;
                                    const onlyNums = value.replace(
                                        /[^\d]/g,
                                        ''
                                    );

                                    if (onlyNums.length < 5) {
                                        return parseInt(onlyNums);
                                    } else {
                                        return onlyNums.substring(
                                            0,
                                            onlyNums.length - 1
                                        );
                                        // return parseInt(
                                        //     onlyNums.substring(
                                        //         0,
                                        //         onlyNums.length - 1
                                        //     )
                                        // );
                                        // return parseInt(
                                        //     onlyNums.substring(
                                        //         0,
                                        //         onlyNums.length - 1
                                        //     )
                                        // );
                                    }
                                }}
                                render={({ input }) => (
                                    <Form.Input
                                        {...input}
                                        label='Gallon'
                                        className='AreaCode'
                                        inverted={true}
                                        width={1}
                                    />
                                )}
                            />
                            {/* <DoneModal /> */}
                            <Form.Button
                                size='massive'
                                type='submit'
                                content='Done'
                                color='green'
                                style={{ marginTop: '30px' }}
                                disabled={
                                    !values.fee ||
                                    !values.renew ||
                                    !values.firstName ||
                                    !values.lastName ||
                                    !values.phone ||
                                    !values.areaCode ||
                                    !values.account ||
                                    open
                                }
                            />
                            <Form.Button
                                size='massive'
                                type='submit'
                                color='google plus'
                                content='Cancel'
                                disabled={open}
                                style={{ marginTop: '30px' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/dashboard');
                                }}
                            />
                            <TransitionablePortal
                                closeOnDocumentClick={false}
                                closeOnEscape={false}
                                closeOnDimmerClick={false}
                                closeOnPortalMouseLeave={false}
                                open={open}>
                                <Segment
                                    style={{
                                        left: '40%',
                                        position: 'fixed',
                                        // top: '50%',
                                        top: '10%',
                                        width: '400px',
                                        zIndex: 10000,
                                    }}>
                                    <Header>This is an example portal</Header>
                                    <pre>
                                        {JSON.stringify(printReceipt, 0, 2)}
                                    </pre>
                                    <Button
                                        content='Print'
                                        onClick={() => {
                                            console.log('print', printReceipt);

                                            const {
                                                fee,
                                                remain,
                                                fourDigit,
                                                fullname,
                                                invoiceDate,
                                                invoiceTime,
                                                account,
                                            } = printReceipt.membership;

                                            const printData = {
                                                field9: fee,
                                                field4: fullname,
                                                field7: fourDigit,
                                                field31: remain,
                                                field15: invoiceDate,
                                                field32: invoiceTime,
                                                field22: account,
                                            };

                                            print(printData, (done) => {
                                                console.log({ done });
                                                setOpen(false);
                                                const {
                                                    membership,
                                                    newRecordID,
                                                } = printReceipt;
                                                history.push({
                                                    pathname: '/buy',
                                                    state: {
                                                        ...membership,
                                                        newRecordID,
                                                    },
                                                });
                                            });
                                        }}
                                    />
                                    <Button
                                        content='Done'
                                        onClick={() => {
                                            console.log('Done');
                                            setOpen(false);
                                            const {
                                                membership,
                                                newRecordID,
                                            } = printReceipt;
                                            history.push({
                                                pathname: '/buy',
                                                state: {
                                                    ...membership,
                                                    newRecordID,
                                                },
                                            });
                                        }}
                                    />
                                </Segment>
                            </TransitionablePortal>
                        </Form.Group>
                    </Form>
                )}
            />
        </>
    );
};

export default AddForm;
