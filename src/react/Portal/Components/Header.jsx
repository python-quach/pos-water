import { Header, Icon } from 'semantic-ui-react';

// HEADER
export const MckeeStoreHeader = ({ title, content }) => (
    <Header as='h1' inverted size='huge' textAlign='left'>
        <Icon name='braille' color='blue' />
        <Header.Content>
            {title}
            <Header.Subheader>{content}</Header.Subheader>
        </Header.Content>
    </Header>
);

MckeeStoreHeader.defaultProps = {
    title: 'Mckee Pure Water',
    content: 'Login Screen: Version 1.0.0',
};

export default MckeeStoreHeader;
