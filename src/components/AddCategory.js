import React,{useState} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import AddExpense from './AddExpense';
import Home from './Home';
import ViewBudget from './ViewBudget';
import ViewExpense from './ViewExpense';
import './Home.css'
import { toast,ToastContainer } from 'react-toastify';
const validationAddCategory = (category) =>{
    let errors={};
    if(!category){
        errors.category="Category is Required";
    }
    return errors;
}


function AddCategory() {
    const [category,setCategory]=useState('');
    const [budget,setBudget]=useState('');    
    const [errors,setErrors] =useState({});
    const navigate=useNavigate();

    const handleCategoryChange=(e)=>{
        setCategory(e.target.value.toLowerCase());
    }
    const handleBudgetChange=(e)=>{
        setBudget(e.target.value);
    }
    const logOut=()=>{
        window.localStorage.removeItem('user.token');
        navigate("/");
    }
    const addCategory = async(e) =>{
        try{
            const token=localStorage.getItem('user.token');
            console.log(token);
            const req=await axios.post('http://localhost:5000/category',{
                type:category,limit:budget},
                { 
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }});
            console.log(req)
            if(req){
                toast.success(' Added Category', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                    });
            }
        }
        catch(e){
            console.log(e);
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validationAddCategory(category));
        addCategory();
        
    }
  return (
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
                    <button className="form-control me-2 btn btn-danger" type="submit" onClick={logOut}>
                            LogOut
                    </button>
                    </form>
                </div>
            </nav>
            <div className='bg'>
                <div className='bg bg2'>
                    <div className='bg bg3'>
                        
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center m-auto">
                <div className="card bg-dark text-white mt-4 ml-2" style={{borderRadius:'1rem',width:'50%'}}>
                    <p className="row d-flex fw-bold justify-content-center mt-4 display-6" >Add New Category<hr/></p>
                    <div className='d-flex mt-2 justify-content-center'>
                        <label>Category :&nbsp;</label>
                        <input
                            type='text'
                            value={category}
                            onChange={handleCategoryChange}
                            required={true}
                        />
                    </div>
                    {errors.category && <p className='error d-flex justify-content-center' style={{color:"red"}}>{errors.category}</p>}
                    <div className="d-flex mt-4 justify-content-center">
                    <label>Budget :&nbsp;</label>
                    <h6>(Budget is optional)</h6>
                        <input
                            type='number'
                            value={budget}
                            onChange={handleBudgetChange}
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button type="button" className="btn btn-success mb-1" onClick={handleSubmit}>Add</button>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    </div>
                </div>
                </div>
                </div>
  )
}

export default AddCategory