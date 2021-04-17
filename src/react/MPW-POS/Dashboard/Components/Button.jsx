import { useState, useContext } from 'react';
import { StoreContext } from '../../store';
import { Transition, Form } from 'semantic-ui-react';

// BUTTON
export const FindButton = ({ values }) => {
    const [visible, setVisible] = useState(true);
    const { error } = useContext(StoreContext);
    const { phone, account, firstName, lastName } = values;

    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='FindMembership'
                content='Find Membership'
                type='submit'
                color={!error ? 'blue' : 'red'}
                size='huge'
                icon='search'
                labelPosition='right'
                circular
                fluid
                disabled={
                    (!phone && !account && !firstName && !lastName) ||
                    (phone && phone.length < 7)
                        ? true
                        : false
                }
                onClick={() => setVisible((prev) => !prev)}
            />
        </Transition>
    );
};
export const AddButton = () => {
    const [visible, setVisible] = useState(true);
    const { history } = useContext(StoreContext);

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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(() => {
                        history.push({ pathname: '/add', state: {} });
                    }, 500);
                }}
            />
        </Transition>
    );
};
export const ReportButton = () => {
    const [visible, setVisible] = useState(true);
    const { history } = useContext(StoreContext);
    return (
        <Transition visible={visible} animation='pulse' duration='500'>
            <Form.Button
                id='ReportButton'
                content={`Daily Report: ${new Date().toLocaleDateString()}`}
                type='button'
                color='yellow'
                size='huge'
                icon='calendar'
                labelPosition='right'
                circular
                fluid
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(() => {
                        history.push({
                            pathname: '/report',
                            state: {},
                        });
                    }, 500);
                }}
            />
        </Transition>
    );
};
export const LogoutButton = () => {
    const [visible, setVisible] = useState(true);
    const { history } = useContext(StoreContext);
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
                onClick={() => {
                    setVisible((prev) => !prev);
                    setTimeout(() => {
                        history.push({ pathname: '/', state: {} });
                    }, 500);
                }}
            />
        </Transition>
    );
};

const DashboardScreenButton = {
    Find: FindButton,
    Add: AddButton,
    Report: ReportButton,
    Logout: LogoutButton,
};

export default DashboardScreenButton;
