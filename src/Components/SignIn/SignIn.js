import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="signInPage">

        <div className="signInLeftPanel">
        </div>

        <div className="signInModal">
            <h1 className="title">Planner</h1>
            <p className="description">A job well planned is half done</p>

            {/* Login Form */}

            <form className="loginForm">

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password"/>
            </div>

            <button className="signInBtn">Sign In</button>
            </form>

            <div className="orDividerDiv">
            <hr className="orDividerRuler"/>
            <p className="orDivider">or</p>
            <hr className="orDividerRuler"/>
            </div>

            <div className="googleSignInBtn">
            <FcGoogle className="googleIcon"/>
            <p className="googleSignInBtnDesc">Continue with Google</p>
            </div>

            <div className="footer">
            <p>New here?</p>
            <Link to="/signup" className="signUpLink">Create an account</Link>
            </div>
        </div>
        </div>
    )
}

export default SignIn
