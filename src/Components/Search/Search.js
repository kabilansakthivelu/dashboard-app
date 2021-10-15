import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {AiOutlineSearch} from 'react-icons/ai';
import {BiTimeFive} from 'react-icons/bi';
import {ValuesContext} from '../../App';
import {useHistory} from 'react-router-dom';
import './Search.css';

const Search = () => {

    const {user, tasks} = useContext(ValuesContext);

    const history = useHistory();

    const placeHolderCall = (id) => {
        history.push(`/view/${id}`);
    }

    return (
        <div>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">Plan your work and work your plan</p>
            <p className="description">Looking for a created task ?</p>

            <form>
            <div className="searchField">
            <input type="text" className="searchInput" placeholder="Enter the task name..."/>
            <button><AiOutlineSearch className="searchIcon"/></button>
            </div>

            <div className="searchResults">
            {tasks.map((task)=>{ 

                    const time1 = task.time.split(" ");
                    const time = time1[1] + " " + time1[0];

                    let taskClassName;

                    if(task.priority === "low"){
                        taskClassName = "taskLowPrioritySearchPage";
                    }
                    else if(task.priority === "medium"){
                        taskClassName = "taskMediumPrioritySearchPage";
                    }
                    else{
                        taskClassName = "taskHighPrioritySearchPage";
                    }

                    return (<div key={task.id} className="singleTaskOnSearchPage" onClick={()=>{placeHolderCall(task.id)}}>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <h1 className={taskClassName}>{task.priority}</h1>
                        <div className="taskTimeOnSearchPage">
                        <BiTimeFive/>
                        <h1>{time}</h1>
                        </div>
                    </div>)
                })}
            </div>

            </form>

            </div>
        </div>)
        :
        <SignIn/>
        }
        </div>
    )
}

export default Search
