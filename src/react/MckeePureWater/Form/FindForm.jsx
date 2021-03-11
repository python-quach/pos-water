import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { Phone, Account, FirstName, LastName } from '../Field/FindField';

const FindForm = (props) => (
    <FinalForm
        onSubmit={props.onSubmit}
        render={({ handleSubmit, form }) => (
            <Form
                size='large'
                onSubmit={(event) => {
                    handleSubmit(event).then(form.reset);
                }}>
                <Phone />
                <Account />
                <FirstName />
                <LastName />
                <Form.Group>
                    <Form.Button content='Find Membership' primary />
                    <Form.Button
                        content='New Membership'
                        secondary
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Add New Membership');
                        }}
                    />
                    <Form.Button
                        content='Daily Report'
                        type='button'
                        color='yellow'
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Daily Report');
                        }}
                    />
                    <Form.Button
                        content='Logout'
                        type='button'
                        color='green'
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Logout');
                        }}
                    />
                </Form.Group>
                {/* <FormSpy>
                        {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                    </FormSpy> */}
            </Form>
        )}
    />
);

export default FindForm;
