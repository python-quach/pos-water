import { Message } from 'semantic-ui-react';
const FormDebug = (data) => (
    <Message>
        <Message.Content>{JSON.stringify(data, 0, 2)}</Message.Content>
    </Message>
);

export default FormDebug;
