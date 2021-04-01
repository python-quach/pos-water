import { Header, Icon } from 'semantic-ui-react';

export const DashBoardHeader = () => (
    <Header as='h1' inverted size='huge' textAlign='left'>
        <Icon name='braille' color='blue' />
        <Header.Content>
            Senter Pure Water
            <Header.Subheader content='DashBoard 2.0.5' />
        </Header.Content>
    </Header>
);

export const LoginHeader = ({ header, icon, content, version }) => {
    return (
        <Header {...header}>
            <Icon {...icon} />
            <Header.Content>
                {content}
                <Header.Subheader content={version} />
            </Header.Content>
        </Header>
    );
};

export const SenterHeader = ({ header, icon, content, version }) => (
    <Header {...header}>
        <Icon {...icon} />
        <Header.Content>
            {content}
            <Header.Subheader content={version} />
        </Header.Content>
    </Header>
);

SenterHeader.defaultProps = {
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
    version: 'Version 2.0.5',
};

LoginHeader.defaultProps = {
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
    version: 'Version 2.0.5',
};

const DefaultHeader = {
    Senter: SenterHeader,
};

export default DefaultHeader;
