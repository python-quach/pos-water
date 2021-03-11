import { useEffect, useState } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import AddForm from '../Form/AddForm';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window;

const AddScreen = () => {
    const [newRecord, setNewRecord] = useState(null);

    useEffect(() => {
        ipcRenderer.send(channels.LAST_RECORD);
        ipcRenderer.on(channels.LAST_RECORD, (_, { record_id }) => {
            ipcRenderer.removeAllListeners(channels.LAST_RECORD);
            setNewRecord(record_id);
        });
    }, []);

    return (
        <Segment>
            <Header block size='huge' content='Add Screen' />
            <AddForm newRecord={newRecord} />
        </Segment>
    );
};

export default AddScreen;
