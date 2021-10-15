import React, {useContext} from 'react';
import Navbar from '../Navbar/Navbar';
import SignIn from '../SignIn/SignIn';
import {ValuesContext} from '../../App';
import { Pie, defaults } from 'react-chartjs-2';
import './Chart.css';

const Chart = () => {

    const {user, nextUpTasks, inProgressTasks, completedTasks} = useContext(ValuesContext);

    let nextUpCount = nextUpTasks.length;
    let inProgressCount = inProgressTasks.length;
    let completedCount = completedTasks.length;

    return (
        <>
        {user ? 
        (<div>
            <Navbar/>
            <div className="HomePageContent">
            <p className="description">The essence of planning is execution</p>
            <p className="description">Have a look on your progress</p>
            <Pie
	            width={100}
	            height={250}
	            options={{ maintainAspectRatio: false }}
              data={{
                    labels: [
                            'Next Up',
                            'In Progress',
                            'Completed'
                            ],
                    datasets: [{
                            data: [nextUpCount, inProgressCount, completedCount],
                            backgroundColor: [
                              'rgb(255, 90, 132)',
                              'rgb(54, 162, 235)',
                              'rgb(255, 205, 86)'
                                            ],
                              }]
                }}
            />
            </div>
        </div>)
        :
        <SignIn/>
        }
        </>
    )
}

export default Chart
