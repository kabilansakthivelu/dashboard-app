import React, {useContext, useRef} from 'react';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {FaUser} from 'react-icons/fa';
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import {db, auth} from '../firebase';
import {ValuesContext} from '../App';
import {toast} from 'react-toastify';

const SignUp = () => {

    const {emailRef, passwordRef} = useContext(ValuesContext);

    const refUsername = useRef();

    const history = useHistory();

    let userFirstName = "";

    const signUp = async(e) =>{
        e.preventDefault();
        const username = refUsername.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(username[0]=== " "){
            toast.error("Please don't start with 'SPACE'. Enter a valid username.", {position: toast.POSITION.TOP_CENTER});
        }
        else
        {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).set({name:username});
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            });
            history.push("/");
            toast.success(`Hey ${userFirstName}, Welcome to Planner !!`, {position: toast.POSITION.TOP_CENTER});
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
        }
    }

    return (
         <div className="signInPage">

        <div className="signInLeftPanel">
        </div>

        <div className="signInModal">
            <h1 className="title">Planner</h1>
            <p className="description">A job well planned is half done</p>
            <p className="description">Create a new account</p>

            <form className="loginForm" onSubmit={signUp}>

            <div className="inputFieldDiv">
            <FaUser className="inputFieldIcon"/>
            <input className="inputField" required type="text" name="username" id="username" placeholder="Username" ref={refUsername}/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" ref={emailRef}/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password" ref={passwordRef}/>
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
