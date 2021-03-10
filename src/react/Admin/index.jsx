import { Header, Button } from 'semantic-ui-react';

const Admin = ({ history }) => {
    return <Button onClick={() => history.push('/')}>Admin Page</Button>;
};

export default Admin;
