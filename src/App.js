import React, {useRef} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home/Home';
import AddNew from './Components/AddNew/AddNew';
import Chart from './Components/Chart/Chart';
import Error from './Components/Error';
import {auth} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

export const ValuesContext = React.createContext();

function App() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [user] = useAuthState(auth);

  return (
    <Router>
      <ValuesContext.Provider value={{emailRef, passwordRef, user}}>
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
      </ValuesContext.Provider>
    </Router>
  );
}

export default App;
