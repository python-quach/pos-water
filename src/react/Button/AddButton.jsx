import { Button, Divider } from 'semantic-ui-react';

const AddButton = ({ phone, account, firstName, lastName, add }) => (
    <>
        <Divider hidden />
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
            // onClick={() => {
            //     console.log('Add New MemberShip');
            //     // props.getLastRecord(() => {
            //     //     props.history.push('/add');
            //     // });
            // }}
        />
    </>
);

export default AddButton;
