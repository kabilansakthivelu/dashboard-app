import React, {useState, useEffect} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose, AiFillHome, AiFillPieChart} from 'react-icons/ai';
import {MdAddTask} from 'react-icons/md';
import {HiOutlineLogout} from 'react-icons/hi';
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import './Navbar.css';

const Navbar = () => {

    const history = useHistory();

    const [menuClose, setMenuClose] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showHamburger, setShowHamburger] = useState();

    useEffect(()=>{
        screenSize()
        window.addEventListener('resize', screenSize);
        return ()=>{
           window.removeEventListener('resize', screenSize); 
        }
    },[])

    const screenSize = () =>{
        if (window.innerWidth >= 768){
            setShowHamburger(false)
        }else{
            setShowHamburger(true)
        }
    }

    const signOut = () => {
        auth.signOut(); 
        history.push("/signin");
        toast.success("Logged out succesfully", {position: toast.POSITION.TOP_RIGHT});
    }

    return (
        <>
        { showHamburger ? (
        <div className="smallScreen">
            <Link to="/"><h2>Planner</h2></Link>
            { !menuClose ? (<GiHamburgerMenu onClick={()=>{setShowMenu(true); setMenuClose(true)}}/>) : 
            (<AiOutlineClose className="font-bold text-2xl" onClick={()=>{setShowMenu(false); setMenuClose(false)}}/>)
            }
            { showMenu ? (
                <div className="hamburgerMenu">
                <ul className="hamburgerMenuLinks">
                <Link to="/" onClick={()=>{setShowMenu(false); setMenuClose(false)}} className="menuLinks"><AiFillHome/>Home</Link>
                <Link to="/newTask" onClick={()=>{setShowMenu(false); setMenuClose(false)}} className="menuLinks"><MdAddTask/>Add New</Link>
                <Link to="/chart" onClick={()=>{setShowMenu(false); setMenuClose(false)}} className="menuLinks"><AiFillPieChart/>Chart</Link>
                <div onClick={signOut} className="menuLinks"><HiOutlineLogout/>Sign Out</div>
                </ul>
                </div>
            ) : ""}
        </div> ) : (
            <div className="largeScreen">
            <Link to="/" className="appHeader"><h1>Planner</h1></Link>
            <div className="navbarIcons">
            <Link to="/" className="menuLinks"><AiFillHome/>Home</Link>
            <Link to="/newTask" className="menuLinks"><MdAddTask/>Add New</Link>
            <Link to="/chart" className="menuLinks"><AiFillPieChart/>Chart</Link>
            <div onClick={signOut} className="menuLinks"><HiOutlineLogout/>Sign Out</div>
            </div>
            </div>
        )}
        </>
    )
}

export default Navbar