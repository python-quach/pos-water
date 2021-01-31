import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './react/App';
import reportWebVitals from './react/reportWebVitals';
import { channels } from './shared/constants';
const { ipcRenderer } = window;

ReactDOM.render(
    <React.StrictMode>
        <App ipcRenderer={ipcRenderer} channels={channels} />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
