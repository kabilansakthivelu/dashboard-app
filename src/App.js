import React, {useRef, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home/Home';
import AddNew from './Components/AddNew/AddNew';
import Chart from './Components/Chart/Chart';
import Search from './Components/Search/Search';
import ViewTask from './Components/ViewTask/ViewTask';
import Error from './Components/Error';
import {auth, db} from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

export const ValuesContext = React.createContext();

function App() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [user] = useAuthState(auth);

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    if(user){
    db.collection('userTasks').doc(auth.currentUser.uid).collection('tasks').onSnapshot((snapshot)=>{
      const arr = [];
      snapshot.forEach((doc)=>{
         const initialTime = parseInt(doc.data().time);
            const getTime = new Date(initialTime).toString();
            const setTime = getTime.split(" ");
            const time1 = setTime[4].split(":");
            let amOrPm;
            if(time1[0] > 12){
                let hours = time1[0] - 12;
                time1[0] = hours;
                if(time1[0] < 10){
                    time1[0] = "0"+time1[0];
                }
                amOrPm = "PM";
            }else{
                amOrPm = "AM";
            }
            const time = setTime[2] +" "+ setTime[1] +" "+ setTime[3] + " at " + time1[0]+":"+time1[1]+":"+time1[2] + " " + amOrPm;

        const result = {
          id: doc.id,
          state: doc.data().state,
          priority: doc.data().priority,
          taskName: doc.data().taskName,
          comments: doc.data().comments,
          time,
        }
        arr.push(result);
      })
    setTasks(arr);
    })
    }
  },[user])

  const nextUpTasks = tasks.filter((item)=>{
    return item.state === "nextUp";
  })

  const inProgressTasks = tasks.filter((item)=>{
    return item.state === "inProgress";
  })

  const completedTasks = tasks.filter((item)=>{
    return item.state === "completed";
  })

  return (
    <Router>
      <ValuesContext.Provider value={{emailRef, passwordRef, user, tasks, nextUpTasks, inProgressTasks, completedTasks}}>
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
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/chart">
          <Chart />
        </Route>
        <Route path="/view/:id" children={<ViewTask/>}>
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
