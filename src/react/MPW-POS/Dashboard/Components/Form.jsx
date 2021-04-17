import { useEffect, useContext } from 'react';
import { StoreContext } from '../../store';
import { Form as FinalForm } from 'react-final-form';
import { Form } from 'semantic-ui-react';

// FORM
export const FindForm = ({ button, field }) => {
    const { setError, history, api } = useContext(StoreContext);

    const onSubmit = async (values) => {
        try {
            const data = await api.find(values);
            if (data.membership) {
                const { record_id } = await api.lastRecord();
                history.push({
                    pathname: '/purchase',
                    state: {
                        record: data.membership,
                        newRecordID: record_id,
                        open: true,
                        initialValues: {
                            ...data.membership,
                            record_id: record_id,
                            renew: 0,
                            buy: 0,
                            fee: 0,
                            invoiceDate: new Date().toLocaleDateString(),
                            invoiceTime: new Date().toLocaleTimeString(),
                        },
                    },
                });
            } else if (data.memberships) {
                history.push({
                    pathname: '/accounts',
                    state: data.memberships,
                });
            } else {
                setError(true);
                document.getElementById('phone').focus();
                return values;
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        document.getElementById('phone').focus();
    }, []);

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit, form, values }) => (
                <Form onSubmit={handleSubmit}>
                    {field.phone(form)}
                    {field.account(form)}
                    {field.firstName(form)}
                    {field.lastName(form)}
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
