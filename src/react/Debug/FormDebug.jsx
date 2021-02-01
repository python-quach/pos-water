import { Message } from 'semantic-ui-react';
const FormDebug = (data) => (
    <Message>
        <Message.Content>{JSON.stringify(data, null)}</Message.Content>
    </Message>
);

export default FormDebug;
