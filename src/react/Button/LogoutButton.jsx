import { Button, Divider } from 'semantic-ui-react';

const LogoutButton = ({ logoutButton, logout }) => (
    <>
        <Divider hidden />
        <Button
            {...logoutButton}
            onClick={() => {
                logout();
            }}
        />
    </>
);

LogoutButton.defaultProps = {
    logoutButton: {
        id: 'LogoutButton',
        content: 'Logout',
        size: 'huge',
        color: 'black',
        icon: 'sign-out',
        labelPosition: 'right',
        circular: true,
        fluid: true,
    },
};

export default LogoutButton;
