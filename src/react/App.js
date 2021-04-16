import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { Screen } from './Screen';

// import BuyScreen from '../react/Screen/NewBuyScreen/BuyScreen';
// import AccountScreen from './Account/Screen/AccountScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// import { DashboardScreen } from './MPW-POS';
// import AdminScreen from './MPW-POS/AdminScreen';
// import LoginScreen from './MPW-POS/LoginScreen';
// import Login from './MPW-POS/LoginScreen';
// import { Component } from './MPW-POS/Component';
// const { Dashboard } = Component;
// import Dashboard from './MPW-POS/Dashboard';
// import Dashboard from './MPW-POS/Dashboard/';
import Login from './MPW-POS/Login/index';
import Admin from './MPW-POS/Admin/index';
import ModalAdminPassword, { AdminPasswordModal } from './MPW-POS/Login/Modal';
import { AdminPasswordScreen } from './MPW-POS/Admin/Screen';
import Dashboard from './MPW-POS/Dashboard/index';

const App = () => (
    <Router>
        <Switch>
            {/* <Route exact path='/' component={Screen.Login} />
            <Route exact path='/admin' component={Screen.Admin} />
            <Route exact path='/admin/table' component={Screen.Table} />
            <Route exact path='/add' component={Screen.Add} />
            <Route exact path='/dashboard' component={Screen.Dashboard} />
            <Route exact path='/accounts' component={AccountScreen} />
            <Route exact path='/buy' component={Screen.Buy} /> */}
            {/* TEST NEW SCREEN */}
            {/* <Route exact path='/test' component={BuyScreen} /> */}
            <Route exact path='/' component={Login} />
            {/* <Route exact path='/dashboard' component={DashboardScreen} /> */}
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/admin' component={Admin} />
            <Route
                exact
                path='/admin/confirm'
                component={AdminPasswordScreen}
            />
            {/* <Route exact path='/admin' component={AdminScreen} /> */}
            <Route exact path='/add' component={() => <div>Add</div>} />
        </Switch>
    </Router>
);
//
export default App;
