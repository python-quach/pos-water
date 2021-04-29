import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// import { Login, Dashboard, Purchase } from './MPW-POS';
// import { Dashboard, Purchase } from './MPW-POS';
// import { Purchase } from './MPW-POS';
// import Login from './MPW-POS/Login';
// import Admin from './MPW-POS/Admin';
// import User from './MPW-POS/User';
// import Dashboard from './MPW-POS/Dashboard';

// import Admin from './MPW-POS/Admin/index';
// import { AdminPasswordScreen } from './MPW-POS/Admin/Screen';
import { Screen } from './MckeePureWater';
import StoreProvider from './MPW-POS/store';

const App = () => (
    <Router>
        <StoreProvider>
            <Switch>
                <Route exact path='/' component={Screen.Login} />
                <Route exact path='/admin' component={Screen.Admin} />
                <Route exact path='/dashboard' component={Screen.Dashboard} />
                <Route exact path='/add' component={Screen.Add} />
                <Route exact path='/purchase' component={Screen.Purchase} />
                {/* <Route exact path='/' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/admin/login' component={Admin} />
                <Route exact path='/admin/users' component={User} /> */}
                {/* <Route exact path='/purchase' component={Purchase} />
                <Route exact path='/admin' component={Admin} />
                <Route
                    exact
                    path='/admin/confirm'
                    component={AdminPasswordScreen}
                />
                <Route exact path='/add' component={() => <div>Add</div>} /> */}
            </Switch>
        </StoreProvider>
    </Router>
);
//
export default App;
