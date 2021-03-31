import { Card, Step, Form, Icon } from 'semantic-ui-react';

const StepExampleStackable = ({ record, onSubmit, cancel }) => (
    <Step.Group stackable='tablet' size='massive' fluid>
        <Step>
            <Icon name='phone' />
            <Step.Content>
                <Step.Title>Phone</Step.Title>
                <Step.Description>{record.phone}</Step.Description>
            </Step.Content>
        </Step>
        <Step active>
            <Icon name='hashtag' />
            <Step.Content>
                <Step.Title>Account</Step.Title>
                <Step.Description>{record.account}</Step.Description>
            </Step.Content>
        </Step>
        <Step active>
            <Icon name='info circle' />
            <Step.Content>
                <Step.Title>Name</Step.Title>
                <Step.Description>
                    {record.first} {record.last}
                </Step.Description>
            </Step.Content>
        </Step>
        {/* <Step>
            <Icon name='lock' color='green' />
            <Step.Content>
                <Form.Input></Form.Input>
            </Step.Content>
        </Step>
        <Step active>
            <Step.Content>
                <Form.Button negative size='massive'>
                    Delete
                </Form.Button>
            </Step.Content>
        </Step>
        <Step>
            <Step.Content>
                <Form.Button color='black' size='massive'>
                    Cancel
                </Form.Button>
            </Step.Content>
        </Step> */}
    </Step.Group>
);

const DeleteDetailCard = ({ record }) => (
    <Card fluid>
        <Card.Content>
            <StepExampleStackable
                record={record}
                account={record.account}
                first={record.first}
                last={record.last}
            />
            {/* <Card.Header content={record.first + ' ' + record.last} />
            <Card.Meta>
                <span className='date'>MemberSince {record.since}</span>
            </Card.Meta>
            <Card.Description content={`Phone # ${record.phone}`} />
            <Card.Description content={`Account # ${record.account}`} /> */}
        </Card.Content>
    </Card>
);

const DefaultCard = {
    DeleteDetail: DeleteDetailCard,
};

export default DefaultCard;
