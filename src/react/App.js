import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './Login/Screen/LoginScreen';
import DashBoardScreen from './Dashboard/Screen/DashboardScreen';
import AddScreen from './Screen/AddScreen';
import BuyScreen from './Screen/BuyScreen';
import AccountScreen from './Screen/AccountScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = ({ api }) => (
    <Router>
        <Switch>
            <Route exact path='/' component={LoginScreen} />
            <Route exact path='/dashboard' component={DashBoardScreen} />
            <Route
                exact
                path='/accounts'
                render={(routeProps) => (
                    <AccountScreen {...routeProps} api={api} />
                )}
            />
            <Route
                exact
                path='/add'
                render={(routeProps) => <AddScreen {...routeProps} api={api} />}
            />
            <Route
                exact
                path='/buy'
                render={(routeProps) => <BuyScreen {...routeProps} api={api} />}
            />
        </Switch>
    </Router>
);

export default App;
