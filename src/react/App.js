import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './Login/Screen/LoginScreen';
import DashBoardScreen from './Dashboard/Screen/DashboardScreen';
import AccountScreen from './Account/Screen/AccountScreen';
import AddScreen from './Add/Screen/AddScreen';
import BuyScreen from './Buy/Screen/BuyScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={LoginScreen} />
            <Route exact path='/dashboard' component={DashBoardScreen} />
            <Route exact path='/accounts' component={AccountScreen} />
            <Route exact path='/add' component={AddScreen} />
            <Route exact path='/buy' component={BuyScreen} />
        </Switch>
    </Router>
);

export default App;
