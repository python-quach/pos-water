import { useState, useEffect } from 'react';
import { Transition, Form, Divider } from 'semantic-ui-react';

const FindButton = ({
    errorMessage,
    findButton,
    errorButton,
    transitionProps,
    values: { phone, account, firstName, lastName },
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [errorMessage]);

    return (
        <>
            <Divider hidden />
            {!errorMessage ? (
                <Form.Button
                    size='massive'
                    {...findButton}
                    disabled={
                        !phone && !account && !firstName && !lastName
                            ? true
                            : false
                    }
                />
            ) : (
                <Transition {...transitionProps} visible={visible}>
                    <Form.Button
                        size='massive'
                        {...errorButton}
                        onClick={(event) => event.preventDefault()}
                    />
                </Transition>
            )}
        </>
    );
};

export default FindButton;

FindButton.defaultProps = {
    findButton: {
        className: 'LogoutButton',
        circular: true,
        fluid: true,
        color: 'blue',
        size: 'huge',
        id: 'FindButton',
        icon: 'search',
        labelPosition: 'right',
        content: 'Find Membership',
    },
    errorButton: {
        circular: true,
        fluid: true,
        size: 'huge',
        id: 'LoginButton',
        color: 'red',
        icon: 'warning sign',
        labelPosition: 'right',
        content: 'Unable to Find Membership',
    },
    transitionProps: {
        animation: 'shake',
        duration: 500,
        unmountOnHide: true,
    },
};
