import { Form } from 'semantic-ui-react';

const AddButton = ({ onClick }) => (
    <Form.Button
        type='button'
        color='teal'
        circular={true}
        fluid={true}
        size='huge'
        id='AddButton'
        icon='add circle'
        labelPosition='right'
        content='New Membership'
        onClick={onClick}
    />
);

export default AddButton;
