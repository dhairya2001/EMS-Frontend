import React from 'react';
import './Home.css'
import AddExpense from './AddExpense';
import { Link, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import ViewBudget from './ViewBudget';
import AddCategory from './AddCategory';
import ViewExpense from './ViewExpense';
import Header from './Header';

function Home () {
    const name=window.localStorage.getItem('user-name');
    return(
        <div className="body">
        <div className="container-fluid">
        <div className="row">
            <Header/>
            <div className='bg'>
                <div className='bg bg2'>
                    <div className='bg bg3'>
                        
                    </div>
                </div>
            </div>
            <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '80vh'
                        }}>
                            <div>
                                <TypeAnimation
                                    sequence={[
                                        `Hello ${name} Welcome to Expense Manager`,
                                        1000,
                                    ]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                />
                            </div>    
                        </div>
                    
        </div>
        </div>
        </div>
    )
}

export default Home;
