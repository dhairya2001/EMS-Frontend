import React from 'react';
import './Home.css'
import AddExpense from './AddExpense';
import { Link, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import ViewBudget from './ViewBudget';
import AddCategory from './AddCategory';
import ViewExpense from './ViewExpense';

function Home () {
   const navigate=useNavigate();
    const logOut=()=>{
        window.localStorage.removeItem('user.token');
        window.localStorage.removeItem('user-name');
        navigate("/");
    }
    const name=window.localStorage.getItem('user-name');
    return(
        <div className="body">
        <div className="container-fluid">
        <div className="row">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                <Link to="/home" element={<Home/>} className="navbar-brand">Expense Management System</Link>
                    <form className="d-flex">
                    <Link to="/add/expense" element={<AddExpense/>} className="navbar-brand">Add Expense </Link>  
                    <Link to="/view/expense" element={<ViewExpense/>} className="navbar-brand">View Expense </Link>
                    <Link to="/add/category" element={<AddCategory/>} className="navbar-brand">Add Category </Link>
                    <Link to="/view/budget" element={<ViewBudget/>} className="navbar-brand">View Budget</Link>
                    <button className="form-control me-2 btn btn-danger" type="submit" onClick={logOut}>LogOut</button>
                    </form>
                </div>
            </nav>
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
