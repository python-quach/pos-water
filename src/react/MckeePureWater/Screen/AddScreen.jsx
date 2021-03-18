import { Segment, TransitionablePortal, Grid } from 'semantic-ui-react';
import AddForm from '../Form/AddForm';

const AddScreen = (props) => {
    const { setOpenAdd, setOpenDashBoard, error, handleAddMembership } = props;

    const close = (e) => {
        e.preventDefault();
        setOpenAdd(false);
        setOpenDashBoard(true);
        props.setError(false);
    };

    return (
        <TransitionablePortal open={props.open}>
            <Segment
                style={{
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 1000,
                    backgroundColor: '#002b487d',
                }}>
                <Grid verticalAlign='top' style={{ height: '100vh' }}>
                    <Grid.Column>
                        <AddForm
                            onSubmit={handleAddMembership}
                            error={error}
                            close={close}
                            // setError={props.setError}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </TransitionablePortal>
    );
};

export default AddScreen;

// return new Promise((resolve, reject) => {
//     ipcRenderer.send(channels.SENTER_ADD, data);
//     ipcRenderer.on(channels.SENTER_ADD, (_, args) => {
//         ipcRenderer.removeAllListeners(channels.SENTER_ADD);
//         if (args.error) {
//             setError(args.error);
//             reject(args.data);
//         } else {
//             resolve(args);
//         }
//     });
// });
