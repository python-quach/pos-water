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
                    {field.phone(form)}
                    {field.account(form)}
                    {field.first(form)}
                    {field.last(form)}
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
