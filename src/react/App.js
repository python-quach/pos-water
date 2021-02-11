import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './Screen/LoginScreen';
import DashBoardScreen from './Screen/DashboardScreen';
import AddScreen from './Screen/AddScreen';
import BuyScreen from './Screen/BuyScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = ({ api }) => (
    <Router>
        <Switch>
            <Route
                exact
                path='/'
                render={(routeProps) => (
                    <LoginScreen {...routeProps} api={api} />
                )}
            />
            <Route
                exact
                path='/dashboard'
                render={(routeProps) => (
                    <DashBoardScreen {...routeProps} api={api} />
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
