import { Form } from 'semantic-ui-react';
import { Form as FinalForm } from 'react-final-form';

const FindForm = ({ onSubmit, button, field }) => {
    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form, values }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event).then(() => setTimeout(form.reset));
                    }}>
                    {field.phone(form, values)}
                    {field.account(form, values)}
                    {field.first(form, values)}
                    {field.last(form, values)}
                    {button.find(values)}
                    {button.add}
                    {button.report}
                    {button.logout}
                </Form>
            )}
        />
    );
};

export default FindForm;
