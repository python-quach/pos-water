import { Form as FinalForm } from 'react-final-form';
import { useContext } from 'react';
import { StoreContext } from '../store';
import LoginForm from './LoginForm';
import FindForm from './FindForm';

export const FormWrapper = ({ name, form }) => {
    const { component } = useContext(StoreContext);
    const { onSubmit } = component[name];

    return <FinalForm onSubmit={onSubmit} render={form} />;
};

const MPW_POS_FORM = {
    Login: () => <FormWrapper name='login' form={LoginForm} />,
    Find: () => <FormWrapper name='dashboard' form={FindForm} />,
};

export default MPW_POS_FORM;
