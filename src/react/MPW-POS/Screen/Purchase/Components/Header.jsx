import { Header, Icon } from 'semantic-ui-react';

export const PurchaseHeader = ({ title, content }) => (
    <Header as='h1' inverted size='huge' textAlign='left'>
        <Icon name='braille' color='blue' />
        <Header.Content>
            {title}
            <Header.Subheader content={content} />
        </Header.Content>
    </Header>
);

export default PurchaseHeader;
