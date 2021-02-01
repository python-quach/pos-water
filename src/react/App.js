import { HashRouter as Router, Switch } from 'react-router-dom';
import { Route } from './Route';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = (props) => (
    <Router>
        <Switch>
            <Route.Login exact path='/' {...props} />
            <Route.Add exact path='/add' {...props} />
            <Route.Buy exact path='/buy' {...props} />
            <Route.Account exact path='/account' {...props} />
            <Route.Dashboard exact path='/dashboard' {...props} />
        </Switch>
    </Router>
);

export default App;
