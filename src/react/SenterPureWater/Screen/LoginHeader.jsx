import { Header, Icon } from 'semantic-ui-react';

const LoginHeader = ({ header, icon, content, version }) => {
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
    version: 'Dashboard Version 2.0.4',
};

export default LoginHeader;
