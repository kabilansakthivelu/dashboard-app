import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home/Home';
import AddNew from './Components/AddNew/AddNew';
import Chart from './Components/Chart/Chart';
import Error from './Components/Error';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/newTask">
          <AddNew />
        </Route>
        <Route path="/chart">
          <Chart />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
