import { Header, Icon, Divider } from 'semantic-ui-react';

const LoginHeader = (props) => {
    const { appVersion, title } = props;
    return (
        <>
            <Header as='h1' inverted size='huge' textAlign='left'>
                <Icon name='braille' color='blue' />
                <Header.Content>
                    {/* Mckee Pure Water */}
                    {title}
                    <Header.Subheader content={`Version ${appVersion}`} />
                </Header.Content>
            </Header>
            <Divider />
            <Divider hidden />
        </>
    );
};

export default LoginHeader;
