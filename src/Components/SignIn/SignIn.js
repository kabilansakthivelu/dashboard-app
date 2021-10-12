import React, {useContext} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai';
import {Link, useHistory} from 'react-router-dom';
import {ValuesContext} from '../../App';
import firebase from 'firebase/compat/app';
import {auth, db} from '../../firebase';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

toast.configure();

const SignIn = () => {

    const history = useHistory();

    let userFirstName = "";

    const {emailRef, passwordRef} = useContext(ValuesContext);

    const googleSignIn = async() =>{
        let provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        history.push("/");
        const name = auth.currentUser.displayName.split(" ");
        const firstName = name[0];
        toast.success(`Hi ${firstName}, Welcome to Planner !!`, {position: toast.POSITION.TOP_CENTER})
    }

    const explictSignIn = async(e) =>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            await db.collection('users').doc(auth.currentUser.uid).get().then((snapshot)=>{
                const userDetails = snapshot.data();
                const userName = userDetails.name;;
                const userName1 = userName.split(" ");
                userFirstName = userName1[0];
            })
            history.push("/");
            toast.success(`Welcome Back ${userFirstName} to Planner!!`, {position: toast.POSITION.TOP_CENTER})
        }
        catch(error){
            let error1 = error.message.split(":");
            let error2 = error1[1].split("(");
            toast.error(error2[0], {position: toast.POSITION.TOP_CENTER});
        }
    }

    return (
        <div className="signInPage">

        <div className="signInLeftPanel">
        </div>

        <div className="signInModal">
            <h1 className="title">Planner</h1>
            <p className="description">A job well planned is half done</p>
            <p className="description">Sign in to your account</p>

            <form className="loginForm" onSubmit={explictSignIn}>

            <div className="inputFieldDiv">
            <AiOutlineMail className="inputFieldIcon"/>
            <input className="inputField" required type="email" name="email" id="email" placeholder="Email" ref={emailRef}/>
            </div>

            <div className="inputFieldDiv">
            <AiOutlineLock className="inputFieldIcon"/>
            <input className="inputField" required type="password" name="password" id="password" placeholder="Password" ref={passwordRef}/>
            </div>

            <button className="signInBtn">Sign In</button>
            </form>

            <div className="orDividerDiv">
            <hr className="orDividerRuler"/>
            <p className="orDivider">or</p>
            <hr className="orDividerRuler"/>
            </div>

            <div className="googleSignInBtn" onClick={googleSignIn}>
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
