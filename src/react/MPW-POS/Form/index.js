import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';
import { useContext } from 'react';
import { StoreContext } from '../store';
import LoginForm from './LoginForm';
import FindForm from './FindForm';

export const FormWrapper = ({ name, form }) => {
    const { component } = useContext(StoreContext);
    const { onSubmit } = component[name];

    return <FinalForm onSubmit={onSubmit} render={form} />;
};

export const Container = ({ name, children }) => {
    console.log({ name, children });
    const { component } = useContext(StoreContext);
    const { onSubmit } = component[name];

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <Form
                    onSubmit={(event) => {
                        handleSubmit(event)
                            .then((data) => {
                                console.log({ data });
                                form.reset({});
                            })
                            .catch((err) => {
                                console.log({ err });
                                form.reset({});
                            });
                    }}>
                    {children}
                </Form>
            )}
        />
    );
};

const MPW_POS_FORM = {
    Login: () => <FormWrapper name='login' form={LoginForm} />,
    Find: () => <FormWrapper name='dashboard' form={FindForm} />,
    Container,
};

export default MPW_POS_FORM;
