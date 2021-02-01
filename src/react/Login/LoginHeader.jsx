import { Header, Icon, Divider } from 'semantic-ui-react';

const LoginHeader = (props) => {
    const { title } = props;
    return (
        <>
            <Header as='h1' inverted size='huge' textAlign='left'>
                <Icon name='braille' color='blue' />
                <Header.Content>
                    {title}
                    <Header.Subheader content={`Version 1.0`} />
                </Header.Content>
            </Header>
            <Divider />
            <Divider hidden />
        </>
    );
};

export default LoginHeader;
