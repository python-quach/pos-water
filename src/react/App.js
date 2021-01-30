import { useState, useEffect } from 'react';
import './App.css';
import { channels } from '../shared/constants';
const { ipcRenderer } = window;

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        ipcRenderer.send(channels.APP_INFO);
        ipcRenderer.on(channels.APP_INFO, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.APP_INFO);
            setData(arg);
        });
    }, []);

    useEffect(() => {
        !data || console.log({ data });
    });

    const { appName } = data;

    return (
        <div className='App'>
            <header className='App-header'>
                <pre>{appName}</pre>
            </header>
        </div>
    );
}

export default App;
