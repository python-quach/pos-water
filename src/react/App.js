import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Screen } from './Screen';

import AccountScreen from './Account/Screen/AccountScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Screen.Login} />
            <Route exact path='/admin' component={Screen.Admin} />
            <Route exact path='/admin/table' component={Screen.Table} />
            <Route exact path='/add' component={Screen.Add} />
            <Route exact path='/dashboard' component={Screen.Dashboard} />
            <Route exact path='/accounts' component={AccountScreen} />
            <Route exact path='/buy' component={Screen.Buy} />
        </Switch>
    </Router>
);

export default App;
