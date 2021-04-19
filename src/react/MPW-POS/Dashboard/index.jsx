import { Screen, Header, Form, Field, Button } from './Components';

export const Dashboard = () => (
    <Screen>
        <Header />
        <Form
            field={{
                phone: (form) => <Field name='phone' form={form} />,
                account: (form) => <Field name='account' form={form} />,
                firstName: (form) => <Field name='firstName' form={form} />,
                lastName: (form) => <Field name='lastName' form={form} />,
            }}
            button={{
                find: (values) => <Button.Find values={values} />,
                add: <Button.Add />,
                report: <Button.Report />,
                logout: <Button.Logout />,
            }}
        />
    </Screen>
);

export default Dashboard;
