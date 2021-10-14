import React, {useContext, useRef, useEffect} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db, auth} from '../../firebase';
import './ViewTask.css';

const ViewTask = () => {

    const {user, tasks} = useContext(ValuesContext);

    const refState = useRef();
    const refPriority = useRef();
    const refTaskName = useRef();
    const refComments = useRef();

    const history = useHistory();

    const {id} = useParams();

    const obj = tasks.find((item)=>{
            return item.id === id;
    })

    useEffect(()=>{
            if(obj !== undefined){
            refState.current.value = obj.state;
            refPriority.current.value = obj.priority;
            refTaskName.current.value = obj.taskName;
            refComments.current.value = obj.comments;
            }
    },[obj])

    const updateTask = (e) =>{
        e.preventDefault();
        const state = refState.current.value;
        const priority = refPriority.current.value;
        const taskName = refTaskName.current.value;
        const comments = refComments.current.value;
        if(state === "null"){
            toast.warning("Please select a state of your task", {position: toast.POSITION.RIGHT});
        }
        else if(priority === "null"){
            toast.warning("Please give a priority to your task", {position: toast.POSITION.RIGHT});
        }
        else if(taskName[0] === " "){
            toast.warning(`Please don't start your task name with "SPACE".`, {position: toast.POSITION.RIGHT});
        }
        else{
            db.collection('userTasks').doc(auth.currentUser.uid).collection('tasks').doc(id).set({
                state,
                priority,
                taskName,
                comments,
                time: (new Date()).getTime().toString(),
            })
            history.push("/");
            toast.success("Task updated successfully !!", {position: toast.POSITION.RIGHT});
        }
        }

    const deleteTask = () =>{
        db.collection('userTasks').doc(auth.currentUser.uid).collection('tasks').doc(id).delete();
        history.push("/");
        toast.success("Task deleted successfully !!", {position: toast.POSITION.RIGHT});
    }

    return (
        <>
        { user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">An hour of planning can save you 10 hours of doing.</p>
            <h1 className="description">Update your task</h1>

            <form className="additionForm" onSubmit={updateTask}>

                <div className="inputFieldForm">
                <label htmlFor="state" className="stateFieldLabel">State: </label>
                <select required name="state" id="state" className="fieldInput" ref={refState}>
                    <option value="null">Please Select</option>
                    <option value="nextUp">Next Up</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                </div>

                <div className="inputFieldForm">
                <label htmlFor="priority" className="priorityFieldLabel">Priority:</label>
                <select required name="priority" id="priority" className="fieldInput" ref={refPriority}>
                    <option value="null">Please Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>

                <div className="inputFieldForm">
                <label htmlFor="title" className="titleFieldLabel">Task: &nbsp;</label>
                <input required type="text" id="title" className="fieldInput" ref=
                {refTaskName} placeholder="Enter the task name..."/>
                </div>

                <div className="inputFieldForm">
                <label htmlFor="description" className="descriptionFieldLabel">Comments: &nbsp;</label>
                <textarea name="description" id="description" className="textAreaInput" ref={refComments} placeholder="Enter your comments here..."></textarea>
                </div>

                <div className="timeSection">
                <p className="timeLabel">Last modified: </p>
                {(obj !== undefined) ?
                (<p className="timeValue">{obj.time}</p>)
                :
                ""}
                </div>

                <div className="buttonSection">
                <button className="individualButton">Save</button>
                <button className="individualButton" onClick={deleteTask}>Delete</button>
                <button className="individualButton" onClick={()=>{history.push("/")}}>Cancel</button>
                </div>

            </form>
            </div>
        </div>)
        :
        <SignIn/>
        }
        </>
    )
}

export default ViewTask
