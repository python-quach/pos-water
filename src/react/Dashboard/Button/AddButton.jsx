import { Button } from 'semantic-ui-react';

const AddButton = ({ phone, account, firstName, lastName, add }) => (
    <Button
        disabled={phone || account || firstName || lastName ? true : false}
        color='teal'
        circular={true}
        fluid={true}
        size='huge'
        id='AddButton'
        icon='add circle'
        labelPosition='right'
        content='New Membership'
        onClick={add}
    />
);

export default AddButton;
