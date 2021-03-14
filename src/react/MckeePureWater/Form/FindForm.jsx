import { Form as FinalForm } from 'react-final-form';
import { Form, Divider } from 'semantic-ui-react';
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
                <Divider hidden />
                <Form.Button
                    content='Find Membership'
                    primary
                    circular
                    fluid
                    icon='search'
                    labelPosition='right'
                    size='huge'
                />
                <Form.Button
                    content='New Membership'
                    color='teal'
                    circular
                    fluid
                    icon='plus circle'
                    labelPosition='right'
                    size='huge'
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Add New Membership');
                        props.setOpenDashBoard(false);
                        props.setOpenAdd(true);
                    }}
                />
                <Form.Button
                    content='Daily Report'
                    type='button'
                    color='yellow'
                    circular
                    icon='file'
                    labelPosition='right'
                    size='huge'
                    fluid
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Daily Report');
                    }}
                />
                <Form.Button
                    content='Logout'
                    color='black'
                    size='huge'
                    fluid
                    circular
                    icon='sign-out'
                    labelPosition='right'
                    type='button'
                    onClick={(e) => {
                        e.preventDefault();
                        props.setOpenDashBoard(false);
                        props.setOpenLogin(true);
                    }}
                />
                {/* </Form.Group> */}
                {/* <FormSpy>
                        {(values) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
                    </FormSpy> */}
            </Form>
        )}
    />
);

export default FindForm;
