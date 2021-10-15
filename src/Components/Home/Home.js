import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import {BiTimeFive} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';
import './Home.css';

const Home = () => {

    const {user, nextUpTasks, inProgressTasks, completedTasks} = useContext(ValuesContext);

    const history = useHistory();

    const placeHolderCall = (id) => {
        history.push(`/view/${id}`);
    }

    return (
        <>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">It takes a good effort to begin and a great effort to complete a task !!</p>
            <p className="description2">Plan and classify your tasks for an efficient work</p>
            <p className="sectionHeader">Your tasks</p>
            <div className="boardSection">

            {/* Next Up board */}

            <div className="individualBoard">

                <div className="boardHeaderSection">
                <h1 className="boardHeader">Next Up</h1>
                <p className="tasksCounter">{nextUpTasks.length}</p>
                </div>

                <hr className="headerDivider"/>
                {(nextUpTasks.length > 0) ?
                (nextUpTasks.map((task)=>{ 

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

                    return (<div key={task.id} className="singleTask" onClick={()=>{placeHolderCall(task.id)}}>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                        <h1 className={taskClassName}>{task.priority}</h1>
                    </div>)
                }))
                :
                (<button className="addTaskButton" onClick={()=>{history.push("/newTask")}}><AiOutlinePlus/>Add Task</button>)
                }
            </div>

            {/* In Progress board */}

            <div className="individualBoard">

                <div className="boardHeaderSection">
                <h1 className="boardHeader">In Progress</h1>
                <p className="tasksCounter">{inProgressTasks.length}</p>
                </div>

                <hr className="headerDivider"/>
                {(inProgressTasks.length > 0) ?
                (inProgressTasks.map((task)=>{ 

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

                    return (<div key={task.id} className="singleTask" onClick={()=>{placeHolderCall(task.id)}}>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                        <h1 className={taskClassName}>{task.priority}</h1>
                    </div>)
                }))
                :
                (<button className="addTaskButton" onClick={()=>{history.push("/newTask")}}><AiOutlinePlus/>Add Task</button>)
                }
            </div>

            {/* Completed board */}

            <div className="individualBoard">

                <div className="boardHeaderSection">
                <h1 className="boardHeader">Completed</h1>
                <p className="tasksCounter">{completedTasks.length}</p>
                </div>

                <hr className="headerDivider"/>
                {(completedTasks.length > 0) ? 
                (completedTasks.map((task)=>{ 

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

                    return (<div key={task.id} className="singleTask" onClick={()=>{placeHolderCall(task.id)}}>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <div className="taskTime">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                        <h1 className={taskClassName}>{task.priority}</h1>
                    </div>)
                }))
                :
                (<button className="addTaskButton" onClick={()=>{history.push("/newTask")}}><AiOutlinePlus/>Add Task</button>)
                }
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
