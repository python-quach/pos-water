import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './Login/LoginScreen';
import DashBoardScreen from './Dashboard/Dashboard';
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
            {/* <Route.Add exact path='/add' {...props} /> */}
            {/* <Route.Buy exact path='/buy' {...props} /> */}
            {/* <Route.Account exact path='/account' {...props} /> */}
        </Switch>
    </Router>
);

export default App;
