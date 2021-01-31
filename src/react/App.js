import { HashRouter as Router, Switch } from 'react-router-dom';
import { Route } from './Route';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = (props) => (
    <Router>
        <Switch>
            <Route.LoginScreen exact path='/' {...props} />
        </Switch>
    </Router>
);

export default App;
