import { Screen, Header, Form, Field } from './Components';
import Button from '../Button';
import { FindForm } from '../Form';

export const Dashboard = () => (
    <Screen>
        <Header />
        <FindForm
            field={{
                phone: (form) => <Field name='phone' form={form} />,
                account: (form) => <Field name='account' form={form} />,
                firstName: (form) => <Field name='firstName' form={form} />,
                lastName: (form) => <Field name='lastName' form={form} />,
            }}
            button={{
                find: (values) => <Button.Pulse name='find' values={values} />,
                add: <Button.Pulse name='add' />,
                report: <Button.Pulse name='report' />,
                logout: <Button.Pulse name='logout' />,
            }}
        />
    </Screen>
);

export default Dashboard;
