import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db, auth} from '../../firebase';
import './AddNew.css';

const AddNew = () => {

    const {user, refState, refPriority, refTaskName, refComments, refDeadline} = useContext(ValuesContext);

    const history = useHistory();

    const addTask = (e) =>{
        e.preventDefault();
        const state = refState.current.value;
        const priority = refPriority.current.value;
        const taskName = refTaskName.current.value;
        const comments = refComments.current.value;
        const deadline1 = refDeadline.current.value;
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
            const deadline2 = deadline1.split("-");
            const deadline = deadline2[0]+"-"+deadline2[1]+"-"+deadline2[2];
            db.collection('userTasks').doc(auth.currentUser.uid).collection('tasks').add({
                state,
                priority,
                taskName,
                comments,
                deadline,
                time: (new Date()).getTime().toString(),
            })
            history.push("/");
            toast.success("Task created successfully !!", {position: toast.POSITION.RIGHT});
        }
        }

    return (
        <>
        { user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">It always seems impossible until it's done. Planning is everything</p>
            <h1 className="description2">Add a new task</h1>
            <form className="additionForm" onSubmit={addTask}>
                <div className="inputFieldForm">
                <label htmlFor="state" className="stateFieldLabel">State*</label>
                <select required name="state" id="state" className="fieldInput" ref={refState}>
                    <option value="null">Please Select</option>
                    <option value="nextUp">Next Up</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="priority" className="priorityFieldLabel">Priority*</label>
                <select required name="priority" id="priority" className="fieldInput" ref={refPriority}>
                    <option value="null">Please Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="title" className="titleFieldLabel">Task*</label>
                <input required type="text" id="title" className="fieldInput" ref=
                {refTaskName} placeholder="Enter the task name..."/>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="deadline" className="deadlineFieldLabel">Deadline*</label>
                <input required type="Date" id="deadline" className="fieldInput" ref=
                {refDeadline}/>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="description" className="descriptionFieldLabel">Comments &nbsp;</label>
                <textarea name="description" id="description" className="textAreaInput" ref={refComments} placeholder="Enter your comments here..."></textarea>
                </div>
                <div className="buttonSection">
                <button className="individualButton">Save</button>
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

export default AddNew
