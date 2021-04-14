import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

const FindForm = ({ onSubmit, button, field }) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form, values }) => (
                <Form onSubmit={handleSubmit}>
                    {field.phone(form)}
                    {field.account(form)}
                    {field.first(form)}
                    {field.last(form)}
                    {button.find(values)}
                    {button.add}
                    {button.report}
                    {button.logout}
                    {button.test}
                </Form>
            )}
        />
    );
};

export default FindForm;
