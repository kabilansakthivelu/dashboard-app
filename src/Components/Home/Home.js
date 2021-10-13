import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import './Home.css';

const Home = () => {

    const {user, nextUpTasks, inProgressTasks, completedTasks} = useContext(ValuesContext);

    return (
        <>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">A job well planned is half done </p>
            <p className="description">Plan and classify your tasks for an efficient work</p>
            <p className="sectionHeader">Your tasks</p>
            <div className="boardSection">
            <div className="individualBoard">
                <h1 className="boardHeader">Next Up</h1>
                <hr className="headerDivider"/>
                {nextUpTasks.map((task)=>{ 
                    return (<div key={task.id} className="singleTask">
                        <h1 className="taskPriority">{task.priority}</h1>
                        <h1>{task.taskName}</h1>
                        <h1>{task.comments}</h1>
                        <h1>{task.time}</h1>
                    </div>)
                })}
            </div>
            <div className="individualBoard">
                <h1 className="boardHeader">In Progress</h1>
                <hr className="headerDivider"/>
            </div>
            <div className="individualBoard">
                <h1 className="boardHeader">Completed</h1>
                <hr className="headerDivider"/>
            </div>
            </div>
            </div>
        </div>)
        :
        <SignIn/>
        }
        </>
    )
}

export default Home
