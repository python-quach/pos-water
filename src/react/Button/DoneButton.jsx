import { Button } from 'semantic-ui-react';

const DoneButton = ({ handleDone, edit }) => {
    return !edit ? (
        // <Button content='Done' onClick={handleDone} floated='right' />
        <Button content='Done' onClick={handleDone} />
    ) : null;
};

export default DoneButton;
