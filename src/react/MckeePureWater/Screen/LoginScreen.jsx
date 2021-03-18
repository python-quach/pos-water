import {
    Segment,
    TransitionablePortal,
    Grid,
    Header,
    Icon,
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
}) => (
    <TransitionablePortal open={open}>
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
                        setError={setError}
                    />
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
