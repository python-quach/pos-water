import {
    Segment,
    TransitionablePortal,
    Grid,
    Header,
    Icon,
    Form,
    Divider,
} from 'semantic-ui-react';
import LoginForm from '../Form/LoginForm';

const LoginScreen = ({
    onSubmit,
    error,
    setError,
    segment,
    grid,
    column,
    header,
    icon,
    content,
    version,
    open,
    backup,
    fileSave,
    closeApp,
    setFileSave,
    loading,
}) => (
    <TransitionablePortal
        closeOnDocumentClick={false}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnPortalMouseLeave={false}
        open={open}>
        <Segment {...segment}>
            <Grid {...grid}>
                <Grid.Column {...column}>
                    <Header {...header}>
                        <Icon {...icon} />
                        <Header.Content>
                            {content}
                            <Header.Subheader content={version} />
                        </Header.Content>
                    </Header>
                    <Divider />
                    <LoginForm
                        onSubmit={onSubmit}
                        error={error}
                        backup={backup}
                        file={fileSave}
                        setFileSave={setFileSave}
                        setError={setError}
                        closeApp={closeApp}>
                        <Divider hidden />
                        <Form.Button
                            circular
                            fluid
                            icon={error ? 'warning' : 'lock'}
                            labelPosition='right'
                            primary
                            size='huge'
                            negative={error}
                            content={error ? 'Invalid Credential' : 'Login'}
                        />
                        <Form.Group widths={2}>
                            <Form.Button
                                circular
                                fluid
                                size='huge'
                                content='Close'
                                icon='close'
                                labelPosition='right'
                                color='black'
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log('Close');
                                    closeApp();
                                }}
                            />
                            <Form.Button
                                loading={loading}
                                circular
                                size='huge'
                                content={fileSave ? fileSave : 'Backup'}
                                icon='database'
                                color='pink'
                                fluid
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log('Backup');
                                    backup();
                                }}
                            />
                        </Form.Group>
                    </LoginForm>
                </Grid.Column>
            </Grid>
        </Segment>
    </TransitionablePortal>
);

LoginScreen.defaultProps = {
    segment: {
        raised: true,
        style: {
            margin: 0,
            height: '100%',
            overflow: 'hidden',
            zIndex: 1000,
            backgroundColor: '#002b487d',
        },
    },
    grid: {
        textAlign: 'center',
        verticalAlign: 'middle',
        style: {
            height: '100vh',
        },
    },
    column: {
        style: { maxWidth: 450 },
    },
    header: {
        as: 'h1',
        inverted: true,
        size: 'huge',
        textAlign: 'left',
    },
    icon: {
        name: 'braille',
        color: 'blue',
    },
    content: 'Senter Pure Water',
    version: 'Dashboard Version 1.0',
};

export default LoginScreen;
