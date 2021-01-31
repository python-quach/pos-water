import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import LoginScreen from './Login/LoginScreen';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={LoginScreen} />
            </Switch>
        </Router>
    );
}

export default App;
