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
                <label htmlFor="state">State</label>
                <select name="state" id="state">
                    <option selected value="null">Please Select</option>
                    <option value="nextUp">Next Up</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority">
                    <option selected value="null">Please Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label htmlFor="title">Title</label>
                <input type="text" id="title"/>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols="30" rows="10"></textarea>
                <button>Save</button>
                <button>Cancel</button>
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
