import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import './AddNew.css';

const AddNew = () => {

    const {user} = useContext(ValuesContext);

    return (
        <>
        { user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <h1 className="description">Add a new task</h1>
            <form className="additionForm">
                <div className="inputFieldForm">
                <label htmlFor="state" className="stateFieldLabel">State: </label>
                <select required name="state" id="state" className="fieldInput">
                    <option value="null">Please Select</option>
                    <option value="nextUp">Next Up</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="priority" className="priorityFieldLabel">Priority:</label>
                <select required name="priority" id="priority" className="fieldInput">
                    <option value="null">Please Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="title" className="titleFieldLabel">Title: &nbsp;</label>
                <input required type="text" id="title" className="fieldInput"/>
                </div>
                <div className="inputFieldForm">
                <label htmlFor="description" className="descriptionFieldLabel">Description: &nbsp;</label>
                <textarea name="description" id="description" className="textAreaInput"></textarea>
                </div>
                <div className="buttonSection">
                <button className="individualButton">Save</button>
                <button className="individualButton">Cancel</button>
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
