import { Field, FormSpy } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { normalize } from '../../Normalize';
import { OnChange } from 'react-final-form-listeners';

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

// LOGIN SCREEN FIELD COMPONENTS
export const LoginScreenField = {
    Username: ({ clearError }) => (
        <Field
            name='username'
            render={({ input }) => (
                <Form.Input
                    id='username'
                    placeholder='username'
                    className='blueIcon'
                    size='massive'
                    icon='user'
                    transparent
                    iconPosition='left'
                    fluid
                    focus
                    name={input.name}
                    value={input.value}
                    onChange={(e) => clearError(e, input)}
                />
            )}
        />
    ),
    Password: ({ clearError }) => (
        <Field
            name='password'
            render={({ input }) => (
                <Form.Input
                    id='password'
                    className='blueIcon'
                    placeholder='password'
                    icon='user'
                    iconPosition='left'
                    type='password'
                    size='massive'
                    transparent
                    fluid
                    focus
                    name={input.name}
                    value={input.value}
                    onChange={(e) => clearError(e, input)}
                />
            )}
        />
    ),
};

// DASHBOARD SCREEN FIELD COMPONENTS
export const DashBoardScreenField = {
    Phone: ({ form }) => (
        <Field
            name='phone'
            parse={normalize.phone}
            render={({ input: { name, value, onChange } }) => (
                <Form.Input
                    id='phone'
                    className='blueIcon'
                    placeholder='xxx-xxx-xxxx'
                    size='massive'
                    icon='whatsapp'
                    iconPosition='left'
                    transparent
                    focus
                    fluid
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        form.change('account', undefined);
                        form.change('first', undefined);
                        form.change('last', undefined);
                    }}
                />
            )}
        />
    ),
    Account: ({ form }) => (
        <Field
            name='account'
            parse={normalize.account}
            render={({ input: { name, value, onChange } }) => (
                <Form.Input
                    id='account'
                    className='blueIcon'
                    placeholder='account #'
                    size='massive'
                    icon='credit card'
                    iconPosition='left'
                    transparent
                    fluid
                    focus
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        form.change('phone', undefined);
                        form.change('first', undefined);
                        form.change('last', undefined);
                    }}
                />
            )}
        />
    ),
    FirstName: ({ form }) => (
        <Field
            name='first'
            parse={normalize.name}
            render={({ input: { name, value, onChange } }) => (
                <Form.Input
                    id='firstName'
                    className='blueIcon'
                    size='massive'
                    icon='user'
                    iconPosition='left'
                    transparent
                    fluid
                    focus
                    spellCheck='false'
                    placeholder='first name'
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        form.change('phone', undefined);
                        form.change('account', undefined);
                    }}
                />
            )}
        />
    ),
    LastName: ({ form }) => (
        <Field
            name='last'
            parse={normalize.name}
            render={({ input: { name, value, onChange } }) => (
                <Form.Input
                    id='lastName'
                    className='blueIcon'
                    size='massive'
                    icon='user'
                    iconPosition='left'
                    transparent
                    fluid
                    focus
                    spellCheck='false'
                    placeholder='last name'
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => {
                        form.change('phone', undefined);
                        form.change('account', undefined);
                    }}
                />
            )}
        />
    ),
};

// ACCOUNT SCREEN FIELD COMPONENTS
export const AccountScreenField = {
    Password: ({ setAdminPassword }) => (
        <Form.Input
            size='massive'
            name='password'
            type='password'
            placeholder='enter password'
            onChange={(event, data) => {
                event.preventDefault();
                setAdminPassword(data.value);
            }}
        />
    ),
};

// ADD SCREEN FIELD COMPONENTS
export const AddScreenField = {
    Date: () => (
        <Field
            name='date'
            render={({ input }) => (
                <Form.Input
                    className='TodayDate'
                    id='data'
                    label='Date'
                    placeholder='mm/dd/yyyy'
                    {...input}
                    size='huge'
                    icon='calendar'
                    iconPosition='left'
                    inverted
                    readOnly
                    width={2}
                />
            )}
        />
    ),
    Time: () => (
        <Field
            name='time'
            render={({ input }) => (
                <Form.Input
                    id='time'
                    label='Time'
                    className='TodayDate'
                    placeholder='xx:xx:xx'
                    {...input}
                    size='huge'
                    icon='calendar'
                    iconPosition='left'
                    inverted
                    readOnly
                    width={2}
                />
            )}
        />
    ),

    Add: ({ error }) => (
        <Field
            name='account'
            parse={normalize.account}
            render={({ input }) => (
                <Form.Input
                    error={error ? error : false}
                    id='account'
                    className='TodayDate'
                    label='Account'
                    placeholder='xxxxxxx'
                    {...input}
                    size='huge'
                    icon='hashtag'
                    iconPosition='left'
                    inverted
                    width={2}
                />
            )}
        />
    ),

    Phone: () => (
        <Field
            name='phone'
            parse={normalize.phone}
            render={({ input }) => (
                <Form.Input
                    id='phone'
                    label='Phone Number'
                    className='TodayDate'
                    placeholder='xxx-xxx-xxxx'
                    {...input}
                    size='huge'
                    icon='phone'
                    iconPosition='left'
                    inverted
                    width={2}
                />
            )}
        />
    ),
    FirstName: () => (
        <Field
            name='first'
            parse={normalize.name}
            render={({ input }) => (
                <Form.Input
                    id='firstName'
                    label='First Name'
                    className='TodayDate'
                    placeholder='First Name'
                    {...input}
                    size='huge'
                    icon='user'
                    iconPosition='left'
                    inverted
                    width={2}
                />
            )}
        />
    ),
    LastName: () => (
        <Field
            name='last'
            parse={normalize.name}
            render={({ input }) => (
                <Form.Input
                    id='lastName'
                    label='Last Name'
                    className='TodayDate'
                    placeholder='Last Name'
                    {...input}
                    size='huge'
                    icon='user'
                    iconPosition='left'
                    inverted
                    width={2}
                />
            )}
        />
    ),
    Fee: () => (
        <Field
            name='fee'
            parse={normalize.fee}
            render={({ input }) => (
                <Form.Input
                    id='fee'
                    className='TodayDate'
                    label='Fee'
                    {...input}
                    size='huge'
                    inverted
                    width={1}
                />
            )}
        />
    ),

    Gallon: () => (
        <Field
            name='gallon'
            parse={normalize.gallon}
            render={({ input }) => (
                <Form.Input
                    id='gallon'
                    label='Gallon'
                    className='TodayDate'
                    {...input}
                    size='huge'
                    inverted
                    width={1}
                />
            )}
        />
    ),
    ChangeField: ({ values }) => (
        <WhenBuyFieldChanges
            field='gallon'
            becomes={values.gallon > 0}
            set='remain'
            to={parseInt(values.gallon)}
            reset={0}
        />
    ),
};

// BUY SCREEN FIELD COMPONENTS
export const BuyScreenField = {
    TodayDate: ({ edit }) => (
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
    ),

    CurrentTime: ({ edit }) => (
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
    ),

    MemberSince: ({ edit }) => (
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
    ),

    Account: ({ edit, error }) => (
        <Field
            name='account'
            parse={normalize.account}
            render={({ input }) => (
                <Form.Input
                    // disabled={edit}
                    id='account'
                    size='huge'
                    className='TodayDate'
                    label='Account'
                    {...input}
                    icon='hashtag'
                    iconPosition='left'
                    inverted
                    error={error ? error : edit}
                    readOnly={edit ? false : true}
                    width={2}
                />
            )}
        />
    ),

    PhoneNumber: (props) => (
        <Field
            name='phone'
            parse={normalize.phone}
            format={normalize.phone}
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
    ),

    FirstName: (props) => (
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
    ),

    LastName: (props) => (
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
    ),

    Buy: ({ edit }) => (
        <Field
            name='buy'
            parse={normalize.gallon}
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
    ),

    Remain: ({ edit, remain }) => (
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
    ),

    Fee: ({ edit }) => (
        <Field
            name='fee'
            parse={normalize.fee}
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
    ),

    Renew: ({ edit }) => (
        <Field
            name='gallon'
            parse={normalize.gallon}
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
    ),
    ChangeField: ({ values, record }) => (
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
    ),
};
