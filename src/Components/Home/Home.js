import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import {BiTimeFive} from 'react-icons/bi';
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

            {/* Next Up board */}

            <div className="individualBoard">
                <h1 className="boardHeader">Next Up</h1>
                <hr className="headerDivider"/>
                {nextUpTasks.map((task)=>{ 

                    const time1 = task.time.split(" ");
                    const time = time1[1] + " " + time1[0];

                    let taskClassName;

                    if(task.priority === "low"){
                        taskClassName = "taskLowPriority";
                    }
                    else if(task.priority === "medium"){
                        taskClassName = "taskMediumPriority";
                    }
                    else{
                        taskClassName = "taskHighPriority";
                    }

                    return (<div key={task.id} className="singleTask">
                        <h1 className={taskClassName}>{task.priority}</h1>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                    </div>)
                })}
            </div>

            {/* In Progress board */}

            <div className="individualBoard">
                <h1 className="boardHeader">In Progress</h1>
                <hr className="headerDivider"/>
                {inProgressTasks.map((task)=>{ 

                    const time1 = task.time.split(" ");
                    const time = time1[1] + " " + time1[0];

                    let taskClassName;

                    if(task.priority === "low"){
                        taskClassName = "taskLowPriority";
                    }
                    else if(task.priority === "medium"){
                        taskClassName = "taskMediumPriority";
                    }
                    else{
                        taskClassName = "taskHighPriority";
                    }

                    return (<div key={task.id} className="singleTask">
                        <h1 className={taskClassName}>{task.priority}</h1>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                    </div>)
                })}
            </div>

            {/* Completed board */}

            <div className="individualBoard">
                <h1 className="boardHeader">Completed</h1>
                <hr className="headerDivider"/>
                {completedTasks.map((task)=>{ 

                    const time1 = task.time.split(" ");
                    const time = time1[1] + " " + time1[0];

                    let taskClassName;

                    if(task.priority === "low"){
                        taskClassName = "taskLowPriority";
                    }
                    else if(task.priority === "medium"){
                        taskClassName = "taskMediumPriority";
                    }
                    else{
                        taskClassName = "taskHighPriority";
                    }

                    return (<div key={task.id} className="singleTask">
                        <h1 className={taskClassName}>{task.priority}</h1>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                    </div>)
                })}
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
