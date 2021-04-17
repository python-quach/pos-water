import { Screen, Header, Form, Field, Button } from './Components';

export const Dashboard = () => (
    <Screen>
        <Header />
        <Form
            field={{
                phone: (form) => <Field.Phone form={form} />,
                account: (form) => <Field.Account form={form} />,
                firstName: (form) => <Field.FirstName form={form} />,
                lastName: (form) => <Field.LastName form={form} />,
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
