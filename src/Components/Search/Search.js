import React, {useContext, useState, useRef} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {AiOutlineSearch} from 'react-icons/ai';
import {BiTimeFive} from 'react-icons/bi';
import {ValuesContext} from '../../App';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import './Search.css';

const Search = () => {

    const {user, tasks} = useContext(ValuesContext);

    const [allSearchResults, setAllSearchResults] = useState([]);

    const [isSearchKeyEntered, setIsSearchKeyEntered] = useState(false);

    const history = useHistory();

    const searchKeyRef = useRef();

    const placeHolderCall = (id) => {
        history.push(`/view/${id}`);
    }

    const search = (e) =>{
        let enteredSearchKey = e.target.value;
        if(enteredSearchKey !== ""){
        setIsSearchKeyEntered(true)
        setAllSearchResults(tasks.filter((item)=>{
            return item.taskName.toLowerCase().includes(enteredSearchKey.toLowerCase());
        }))
        }else{
            setAllSearchResults([]);
            setIsSearchKeyEntered(false);
        }
    }

    const search2 = (e) =>{
        e.preventDefault();
        let enteredSearchKey = searchKeyRef.current.value;
        if(enteredSearchKey === ""){
            toast.warning("Please enter a task name", {position: toast.POSITION.RIGHT});
            setIsSearchKeyEntered(false);
        }
        else
        {
            setIsSearchKeyEntered(true);
            setAllSearchResults(tasks.filter((item)=>{
            return item.taskName.toLowerCase().includes(enteredSearchKey.toLowerCase());
        }))
        if((allSearchResults.length === 0) && (isSearchKeyEntered === true)){
            toast.error("No matching results !!", {position: toast.POSITION.RIGHT})
        }
        }
    }

    return (
        <div>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">Plan your work and work your plan</p>
            <p className="description2">Looking for a created task ?</p>

            <form onSubmit={search2}>
            <div className="searchField">
            <input type="text" className="searchInput" placeholder="Enter the task name..." onChange={search} ref={searchKeyRef}/>
            <button><AiOutlineSearch className="searchIcon"/></button>
            </div>

            <div className="searchResults">
            {(allSearchResults.length !== 0) ?
            (allSearchResults.map((task)=>{ 

                    const deadline1 = task.deadline.split("-");
                    const deadline = deadline1[2] + "-" + deadline1[1] + "-" + deadline1[0];

                    let taskClassName;
                    let taskState;

                    if(task.priority === "low"){
                        taskClassName = "taskLowPrioritySearchPage";
                    }
                    else if(task.priority === "medium"){
                        taskClassName = "taskMediumPrioritySearchPage";
                    }
                    else{
                        taskClassName = "taskHighPrioritySearchPage";
                    }

                    if(task.state === "nextUp"){
                        taskState = "Next Up";
                    }
                    else if(task.state === "inProgress"){
                        taskState = "In Progress";
                    }
                    else{
                        taskState = "Completed";
                    }

                    return (<div key={task.id} className="singleTaskOnSearchPage" onClick={()=>{placeHolderCall(task.id)}}>
                        <h1 className="taskTitle">{task.taskName}</h1>
                        <h1 className="taskComments">{task.comments}</h1>
                        <h1 className={taskClassName}>{task.priority}</h1>
                        <h1 className="taskTimeOnSearchPage">{taskState}</h1>
                        <div className="taskTimeOnSearchPage">
                        <BiTimeFive/>
                        <h1>{deadline}</h1>
                        </div>
                    </div>)
                }))
                :
                ((allSearchResults.length === 0) && (isSearchKeyEntered === true))
                ?
                <p className="alertText">No matching results !!</p>
                :
                <p className="alertText">Enter the task name in search dialog to catch the one you are looking for !!</p>}
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
