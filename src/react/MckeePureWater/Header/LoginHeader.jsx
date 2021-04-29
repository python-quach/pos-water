import { Header, Icon } from 'semantic-ui-react';

export const LoginHeader = ({ title, content }) => (
    <Header as='h1' inverted size='huge' textAlign='left'>
        <Icon name='braille' color='blue' />
        <Header.Content>
            {title}
            <Header.Subheader>{content}</Header.Subheader>
        </Header.Content>
    </Header>
);

export default LoginHeader;
