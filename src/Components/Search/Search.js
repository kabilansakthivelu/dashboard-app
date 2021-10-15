import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import './Search.css';

const Search = () => {

    const {user} = useContext(ValuesContext);

    return (
        <div>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">The essence of planning is execution</p>
            <p className="description">Have a look on your progress</p>
            </div>
        </div>)
        :
        <SignIn/>
        }
        </div>
    )
}

export default Search
