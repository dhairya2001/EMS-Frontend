import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Home.css'
import { toast,ToastContainer } from 'react-toastify';
import Header from './Header';
import { useMediaQuery } from '@chakra-ui/react';
import { BaseURL } from './BaseURL';
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
    const [isMobile] = useMediaQuery('(max-width:600px)');
    
    const navigate=useNavigate();

    const handleCategoryChange=(e)=>{
        setCategory(e.target.value.toLowerCase());
    }
    const handleBudgetChange=(e)=>{
        setBudget(e.target.value);
    }
    const addCategory = async(e) =>{
        try{
            const token=localStorage.getItem('user.token');
            const req=await axios.post(`${BaseURL}/category`,{
                type:category,limit:budget},
                { 
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }});
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
                    setBudget('');
                    setCategory('');
            }
        }
        catch(e){
            toast.error(' Error Occured ', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                })
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
            <Header/>
            <div className='bg'>
                <div className='bg bg2'>
                    <div className='bg bg3'>
                        
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center m-auto">
                <div className="card bg-dark text-white mt-4 ml-2" style={{borderRadius:'1rem',width:isMobile?'90%':'50%'}}>
                    <p className="row d-flex fw-bold justify-content-center mt-4 display-6" style={{textAlign:"center"}}>Add New Category<hr/></p>
                    <div style={{display:!isMobile?'flex':'',marginTop:'10px',marginBottom:'15px',justifyContent:'center',textAlign:'center'}}>
                        <label>Category :&nbsp;</label>
                        <input
                            type='text'
                            value={category}
                            onChange={handleCategoryChange}
                            required={true}
                        />
                    </div>
                    {errors.category && <p className='error d-flex justify-content-center' style={{color:"red"}}>{errors.category}</p>}
                    <div style={{display:!isMobile?'flex':'',marginTop:'10px',marginBottom:'15px',justifyContent:'center',textAlign:'center'}}>
                    <label>Budget :&nbsp;</label>
                    {/* <h6>(optional)</h6> */}
                        <input
                            type='number'
                            value={budget}
                            placeholder="Optional ex. 400"
                            onChange={handleBudgetChange}
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button type="button" className="btn btn-success mb-3" onClick={handleSubmit}>Add</button>
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