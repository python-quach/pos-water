import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import Login from './MPW-POS/Login/index';
import Admin from './MPW-POS/Admin/index';
import { AdminPasswordScreen } from './MPW-POS/Admin/Screen';
import Dashboard from './MPW-POS/Dashboard/index';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/admin' component={Admin} />
            <Route
                exact
                path='/admin/confirm'
                component={AdminPasswordScreen}
            />
            <Route exact path='/add' component={() => <div>Add</div>} />
        </Switch>
    </Router>
);
//
export default App;
