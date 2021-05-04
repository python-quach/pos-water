import { Form, Button } from 'semantic-ui-react';

// LOGIN SCREEN BUTTON COMPONENTS
export const LoginScreenButton = {
    /**
     * Semantic React Form Button Component
     * @param {Boolean} error
     * @returns {Function} - React JSX Stateless Form Button Component
     */
    Login: ({ error }) => (
        <Form.Button
            type='submit'
            content={error ? error : 'Login'}
            icon={error ? 'warning' : 'lock'}
            negative={error ? true : false}
            labelPosition='right'
            size='huge'
            circular
            fluid
            primary
        />
    ),
    /**
     * Semantic React Form Button Component
     * @param {Function} closeApp = Close the Application
     * @returns {Function} - React JSX Stateless Form Button Component
     */
    Close: ({ closeApp }) => (
        <Form.Button
            content='Close'
            icon='close'
            color='black'
            labelPosition='right'
            size='huge'
            circular
            fluid
            onClick={closeApp}
        />
    ),
    /**
     * Semantic React Form Button Component
     * @param {Boolean} loading - A boolean to enable and disable loading spiner
     * @param {String} fileSave
     * @param {Function} handleBackup
     * @returns
     */
    Backup: ({ loading, fileSave, handleBackup }) => (
        <Form.Button
            content={fileSave ? fileSave : 'Backup'}
            size='huge'
            icon='database'
            color='pink'
            circular
            fluid
            loading={loading}
            onClick={handleBackup}
        />
    ),
};

// DASHBOARD SCREEN BUTTON COMPONENTS
export const DashBoardScreenButton = {
    Find: ({ values }) => (
        <Form.Button
            disabled={
                (!values.phone || values.phone.length < 14) &&
                !values.account &&
                !values.first &&
                !values.last
            }
            content='Find Membership'
            primary
            circular
            fluid
            icon='search'
            labelPosition='right'
            size='huge'
        />
    ),
    Add: ({ add }) => (
        <Form.Button
            content='New Membership'
            color='teal'
            circular
            fluid
            icon='plus circle'
            labelPosition='right'
            size='huge'
            onClick={add}
        />
    ),
    Report: ({ report }) => (
        <Form.Button
            content={`Daily Report ${new Date().toDateString()}`}
            type='button'
            color='yellow'
            circular
            icon='file'
            labelPosition='right'
            size='huge'
            fluid
            onClick={report}
        />
    ),
    Logout: ({ logout }) => (
        <Form.Button
            content='Logout'
            color='black'
            size='huge'
            fluid
            circular
            icon='sign-out'
            labelPosition='right'
            type='button'
            onClick={logout}
        />
    ),
};

// ADD SCREEN BUTTON COMPONENT
export const AddScreenButton = {
    Add: ({ values, submitting }) => (
        <Form.Button
            disabled={
                !values.phone ||
                values.phone.length < 14 ||
                !values.account ||
                !values.first ||
                !values.last ||
                !values.fee ||
                !values.gallon ||
                submitting
            }
            type='submit'
            loading={submitting}
            primary
            fluid
            style={{ marginTop: '30px' }}
            size='huge'
            content='Add'
        />
    ),
    Cancel: ({ close }) => (
        <Form.Button
            content='Cancel'
            style={{ marginTop: '30px' }}
            size='huge'
            fluid
            negative
            onClick={close}
        />
    ),
};

// ACCOUNT SCREEN BUTTON COMPONENT
export const AccountScreenButton = {
    Select: ({ account, goToBuyScreen }) => (
        <Button
            size='huge'
            primary
            onClick={async (e) => goToBuyScreen(e, account)}
            content='Select'
        />
    ),
    Delete: ({ showDeleteModal, record }) => (
        <Button
            type='button'
            content='Delete'
            attached
            size='huge'
            negative
            onClick={(e) => {
                console.log('Delete', record);
                showDeleteModal(e, record);
            }}
        />
    ),
    Done: ({ closeAccountScreen }) => (
        <Button
            content='Done'
            attached
            color='black'
            size='huge'
            onClick={closeAccountScreen}
        />
    ),
    ConfirmDelete: () => (
        <Form.Button
            size='massive'
            content='Delete'
            color='red'
            type='submit'
        />
    ),
    Cancel: ({ setOpenDelete }) => (
        <Form.Button
            size='massive'
            type='button'
            color='black'
            content='Cancel'
            onClick={(e) => {
                e.preventDefault();
                setOpenDelete(false);
            }}
        />
    ),
};

// BUY SCREEN BUTTON COMPONENTS
export const BuyScreenButton = {
    History: ({ open }) => (
        <Form.Button
            type='button'
            size='huge'
            color='teal'
            content='History'
            onClick={open}
        />
    ),
    Done: ({ close }) => (
        <Form.Button size='huge' color='black' content='Done' onClick={close} />
    ),
    Delete: ({ open }) => (
        <Form.Button
            className='pushable'
            floated='left'
            size='huge'
            negative
            onClick={open}
            content='Delete'
        />
    ),
    Renew: ({ disabled, setOpenReceipt }) => (
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
    ),
    Buy: ({ disabled, setOpenReceipt }) => (
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
    ),
    Edit: ({
        values,
        setEdit,
        edit,
        handleEdit,
        setOpenReceipt,
        originalAccount,
    }) => (
        <Form.Button
            type='button'
            disabled={
                !values.first ||
                !values.last ||
                !values.phone ||
                !values.account ||
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
    ),
    Cancel: ({ form, values, record, setEdit }) => (
        <Form.Button
            type='button'
            color='black'
            size='huge'
            style={{ marginTop: '30px' }}
            onClick={(e) => {
                e.preventDefault();
                form.reset({
                    ...values,
                    account: record.account,
                    first: record.first,
                    last: record.last,
                    phone: record.phone,
                });
                setEdit(false);
            }}>
            Cancel
        </Form.Button>
    ),
};

const SenterButtonComponents = {
    LoginScreenButton,
    DashBoardScreenButton,
    AddScreenButton,
    AccountScreenButton,
    BuyScreenButton,
};

export default SenterButtonComponents;
