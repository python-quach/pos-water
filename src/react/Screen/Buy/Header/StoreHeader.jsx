import { Header, Icon, Divider } from 'semantic-ui-react';

const StoreHeader = (props) => {
    const { title, content } = props;
    return (
        <>
            <Header as='h1' inverted size='huge' textAlign='left'>
                {/* <Header as='h1' inverted size='massive' textAlign='left'> */}
                <Icon name='braille' color='blue' />
                <Header.Content>
                    {title}
                    <Header.Subheader content={content} />
                </Header.Content>
            </Header>
            <Divider />
            <Divider hidden />
        </>
    );
};

export default StoreHeader;
