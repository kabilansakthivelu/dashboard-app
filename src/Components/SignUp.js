import React from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const SignUp = () => {
    return (
         <div className="signInPage">

        <div className="signInLeftPanel">
        </div>

        <div className="signInModal">
            <h1 className="title">Planner</h1>
            <p className="description">A job well planned is half done</p>
            <p className="description">Create a new account</p>

            <form className="loginForm">

            <div className="inputFieldDiv">
            <FaUser className="inputFieldIcon"/>
            <input className="inputField" required type="text" name="username" id="username" placeholder="Username"/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <button className="signInBtn">Sign Up</button>
            </form>

            <div className="footer">
            <p>Already have an account?</p>
            <Link to="/signin" className="signUpLink">Sign In</Link>
            </div>
        </div>
        </div>
    )
}

export default SignUp
