import React from 'react';
import Navbar from '../Navbar/Navbar';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../SignIn/SignIn';
import './Home.css';

const Home = () => {

    const [user] = useAuthState(auth);

    return (
        <>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">A job well planned is half done </p>
            <p className="description">Plan and classify your task for an efficient work</p>
            <p className="sectionHeader">Your tasks</p>
            <div className="boardSection">
            <div className="individualBoard">
                <h1 className="boardHeader">Next Up</h1>
                <hr className="headerDivider"/>
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
