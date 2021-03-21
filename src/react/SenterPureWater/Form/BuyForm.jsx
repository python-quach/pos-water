import { useState } from 'react';
import {
    Form as FinalForm,
    Field as FinalField,
    FormSpy,
} from 'react-final-form';
import { Form, Divider, Modal, Card, Icon } from 'semantic-ui-react';
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
import { EditButton } from '../Button/EditButton';
import { BuyButton } from '../Button/BuyButton';
import { RenewButton } from '../Button/RenewButton';

const AdminModal = (props) => {
    console.log(props);
    return (
        <Modal
            basic
            size='tiny'
            dimmer='blurring'
            closeOnDimmerClick={false}
            closeOnDocumentClick={false}
            onClose={() => props.setOpenDelete(false)}
            onOpen={() => props.setOpenDelete(true)}
            open={props.openDelete}>
            <Modal.Content>
                {/* <Card centered> */}
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            {props.deleteAccount.first +
                                ' ' +
                                props.deleteAccount.last}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                MemberSince {props.deleteAccount.since}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            Phone # {props.deleteAccount.phone}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='user' />
                        Account: {props.deleteAccount.account}
                    </Card.Content>
                </Card>
            </Modal.Content>
            <Modal.Actions>
                <Form>
                    <Form.Group>
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='enter password'
                            onChange={(event, data) => {
                                event.preventDefault();
                                props.setAdminPassword(data.value);
                            }}
                        />
                        <Form.Input type='hidden' width={2} />
                        <Form.Button
                            icon='remove'
                            content='Delete'
                            color='red'
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log(
                                    'Delete Account',
                                    props.deleteAccount.account
                                );
                                props.handleDeleteMembership({
                                    account: props.deleteAccount.account,
                                    password: props.adminPassword,
                                });
                                // props.setOpenDelete(false);
                                // props.setOpenBuyScreen(false);
                                // props.setOpenDashBoard(true);
                            }}
                        />
                        <Form.Button
                            color='black'
                            content='Cancel'
                            onClick={(e) => {
                                props.setOpenDelete(false);
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Actions>
        </Modal>
    );
};

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
                        <Remain edit={edit} remain={values.remain} />
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
                        <Form.Input type='hidden' width={13} />
                        <Form.Button
                            floated='left'
                            // attached
                            size='huge'
                            negative
                            onClick={(e) => {
                                e.preventDefault();
                                // console.log(values, props.record);
                                props.setDeleteAccount(props.record);
                                props.setOpenDelete(true);
                            }}>
                            Delete
                        </Form.Button>
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
                    {props.record && (
                        <AdminModal
                            deleteAccount={props.record}
                            // record={props.record}
                            setOpenDashBoard={props.setOpenDashBoard}
                            setOpenDelete={props.setOpenDelete}
                            openDelete={props.openDelete}
                            handleDeleteMembership={
                                props.handleDeleteMembership
                            }
                            setOpenBuyScreen={props.setOpenBuyScreen}
                            adminPassword={props.adminPassword}
                            setAdminPassword={props.setAdminPassword}
                        />
                    )}
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
