import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
import { Phone, Account, FirstName, LastName } from '../Field/FindField';
import { getDailyReport } from '../Api';

const FindButton = ({ values }) => (
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
);

const NewMemberButton = ({ openAddScreen }) => (
    <Form.Button
        content='New Membership'
        color='teal'
        circular
        fluid
        icon='plus circle'
        labelPosition='right'
        size='huge'
        onClick={openAddScreen}
    />
);

const DailyReportButton = () => (
    <Form.Button
        content={`Daily Report ${new Date().toLocaleDateString()}`}
        type='button'
        color='yellow'
        circular
        icon='file'
        labelPosition='right'
        size='huge'
        fluid
        onClick={(e) => {
            e.preventDefault();
            const date = new Date();
            console.log('Daily Report', date.toLocaleDateString());
            getDailyReport(
                date.toLocaleDateString(),
                date.toLocaleTimeString(),
                (data) => {
                    console.log({ data });
                }
            );
        }}
    />
);

const LogoutButton = ({ logout }) => (
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
);

const renderFields = (form, values) => (
    <>
        <Phone form={form} />
        <Account form={form} />
        <FirstName form={form} values={values} />
        <LastName form={form} values={values} />
    </>
);

const renderButtons = (values, logout, openAddScreen) => (
    <>
        <FindButton values={values} />
        <NewMemberButton openAddScreen={openAddScreen} />
        <DailyReportButton />
        <LogoutButton logout={logout} />
    </>
);

const FindForm = ({ onSubmit, openAddScreen, logout }) => (
    <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                {renderFields(form, values)}
                <Divider hidden />
                {renderButtons(values, logout, openAddScreen)}
            </Form>
        )}
    />
);

export default FindForm;
