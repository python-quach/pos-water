import { Form as FinalForm } from 'react-final-form';
import { useContext } from 'react';
import { StoreContext } from '../store';
import LoginForm from './LoginForm';
import FindForm from './FindForm';

export const FormWrapper = ({ action, form }) => {
    const { onSubmit } = useContext(StoreContext);
    return <FinalForm onSubmit={onSubmit[action]} render={form} />;
};

// export const AdminLoginForm = ({ onSubmit, cancel }) => {
//     const [error, setError] = useState(false);
//     const [visibleSubmitButton, setVisibleSubmitButton] = useState(true);
//     const [visibleCancelButton, setVisibleCancelButton] = useState(true);

//     return (
//         <FinalForm
//             onSubmit={onSubmit}
//             render={({ handleSubmit, form }) => (
//                 <Form
//                     size='huge'
//                     onSubmit={(event) => {
//                         handleSubmit(event)
//                             .then()
//                             .catch((err) => {
//                                 setError(true);
//                                 form.reset({});
//                             });
//                     }}>
//                     <Form.Group inline>
//                         <Field
//                             name='password'
//                             render={({ input }) => (
//                                 <Form.Input
//                                     {...input}
//                                     id='password'
//                                     placeholder='password'
//                                     type='password'
//                                     focus
//                                     error={error}
//                                     onChange={(e, { value }) => {
//                                         setError(false);
//                                         return input.onChange(value);
//                                     }}
//                                 />
//                             )}
//                         />
//                         <Transition
//                             visible={visibleSubmitButton}
//                             animation='pulse'
//                             duration='500'>
//                             <Form.Button
//                                 size='huge'
//                                 content='Submit'
//                                 type='submit'
//                                 color={error ? 'red' : 'blue'}
//                                 onClick={() =>
//                                     setVisibleSubmitButton((prev) => !prev)
//                                 }
//                             />
//                         </Transition>
//                         <Transition
//                             visible={visibleCancelButton}
//                             animation='pulse'
//                             duration='500'>
//                             <Form.Button
//                                 size='huge'
//                                 content='Cancel'
//                                 secondary
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     setVisibleCancelButton((prev) => !prev);
//                                     setTimeout(() => {
//                                         cancel();
//                                     }, 500);
//                                 }}
//                             />
//                         </Transition>
//                     </Form.Group>
//                 </Form>
//             )}
//         />
//     );
// };

const MPW_POS_FORM = {
    Login: () => <FormWrapper action='login' form={LoginForm} />,
    Find: () => <FormWrapper action='find' form={FindForm} />,
};

export default MPW_POS_FORM;
