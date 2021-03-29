import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from '../react/SenterPureWater/Screen/LoginScreen';
import DashBoardScreen from '../react/SenterPureWater/Screen/DashBoardScreen';
import AddScreen from '../react/SenterPureWater/Screen/AddScreen';
import AccountScreen from '../react/SenterPureWater/Screen/AccountScreen';
import BuyScreen from '../react/SenterPureWater/Screen/BuyScreen';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={LoginScreen} />
            <Route exact path='/dashboard' component={DashBoardScreen} />
            <Route exact path='/account' component={AccountScreen} />
            <Route exact path='/add' component={AddScreen} />
            <Route exact path='/buy' component={BuyScreen} />
        </Switch>
    </Router>
);

export default App;
