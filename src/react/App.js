import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SenterPureWater from './SenterPureWater';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={SenterPureWater} />
        </Switch>
    </Router>
);

export default App;
