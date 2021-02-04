import { Button } from 'semantic-ui-react';

const DoneButton = ({ handleDone }) => {
    return <Button content='Done' onClick={handleDone} />;
};

export default DoneButton;
