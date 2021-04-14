import { useState } from 'react';
import { Transition, Form } from 'semantic-ui-react';

// BUTTON
export const FindButton = ({ error, disabled }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Find Membership'
                type='submit'
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='search'
                labelPosition='right'
                circular
                fluid
                disabled={disabled}
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const AddButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='AddButton'
                content='New Membership'
                type='button'
                size='huge'
                color='teal'
                icon='add circle'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
            />
        </Transition>
    );
};
export const ReportButton = () => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='ReportButton'
                type='button'
                color='yellow'
                size='huge'
                icon='calendar'
                labelPosition='right'
                content={`Daily Report: ${new Date().toLocaleDateString()}`}
                circular
                fluid
                onClick={() => {
                    setVisible((prev) => !prev);
                }}
            />
        </Transition>
    );
};
export const LogoutButton = ({ onClick }) => {
    const [visible, setVisible] = useState(true);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                content='Logout'
                type='button'
                id='LogoutButton'
                size='huge'
                color='black'
                icon='sign-out'
                labelPosition='right'
                circular
                fluid
                onClick={() => onClick(setVisible)}
            />
        </Transition>
    );
};

const DashboardButton = {
    Find: FindButton,
    Add: AddButton,
    Report: ReportButton,
    Logout: LogoutButton,
};

export default DashboardButton;
