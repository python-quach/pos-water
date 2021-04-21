import { Form as FinalForm } from 'react-final-form';
import { useContext } from 'react';
import { StoreContext } from '../store';
import LoginForm from './LoginForm';
import FindForm from './FindForm';

export const FormWrapper = ({ action, form }) => {
    const { onSubmit } = useContext(StoreContext);
    return <FinalForm onSubmit={onSubmit[action]} render={form} />;
};

const MPW_POS_FORM = {
    Login: () => <FormWrapper action='login' form={LoginForm} />,
    Find: () => <FormWrapper action='find' form={FindForm} />,
};

export default MPW_POS_FORM;
