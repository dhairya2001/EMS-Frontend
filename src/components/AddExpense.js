import React,{useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import AddCategory from './AddCategory';
import ViewExpense from './ViewExpense';
import Home from './Home';
import ViewBudget from './ViewBudget';
import './Home.css'
import { toast,ToastContainer } from 'react-toastify';
import {ExpData,useExpData} from './ExpenseData'
import Header from './Header';
import { useMediaQuery } from '@chakra-ui/react';
import { BaseURL } from './BaseURL';

const validationAddExpense = (date,money,category) =>{
    let errors={};
    if(!date){
        errors.date="Date is Required";
    }
    if(!money){
        errors.money="Enter amount";
    }
    if(!category || category==="--Select--"){
        errors.category="Select Category";
    }
    return errors;
}

function AddExpense() {
    const [date,setDate] = useState('');
    const [money,setMoney]=useState('');
    const [category,setCategory]=useState("--Select--");
    const [errors,setErrors] =useState({});
    const [categoryData,setCategoryData]=useState([]);
    const [isMobile] = useMediaQuery('(max-width:600px)');
    
    const navigate=useNavigate();
    const handleDateChange=(e)=>{
        setDate(e.target.value);
    }
    const handleMoneyChange=(e)=>{
        setMoney(e.target.value);
    }
    const handleCategoryChange=(e)=>{
        setCategory(e.target.value.toLowerCase());
    }
    
    const getCategory = async(e) =>{
        try {
            const token=localStorage.getItem('user.token');
            await axios.get(`${BaseURL}/category`,
            {   
                params:{type:category},
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
            .then(json=>setCategoryData(json.data));
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  getCategory()
        return () => { ignore = true; }
    },[]);

    function renderOption(){
        return categoryData.map(cat=>{
            return(<option>{cat.type}</option>)
        })
    }
    const addExpense = async(e) =>{
        try{
            const token=localStorage.getItem('user.token');
            const req=await axios.post(`${BaseURL}/ems`,{
                date:date,category:category,money:money},
                { 
                    headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }});
            if(req){
                toast.success('Expense Added', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                    });
                    setDate('');
                    setCategory('--Select--');
                    setMoney('');
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validationAddExpense(date,money,category));
            addExpense();
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
                <div className="card bg-dark text-white mt-4 ml-2" style={{borderRadius:'1rem',maxWidth:isMobile?"90%":"50%"}}>
                    <p className="row d-flex fw-bold justify-content-center mt-4 display-6" style={{textAlign:'center'}} >Add New Expense<hr/></p>
                    <div style={{display:!isMobile?'flex':'',marginTop:'10px',marginBottom:'15px',justifyContent:'center',textAlign:'center'}} >
                        <label>Date :&nbsp;</label>
                        <input
                            type='date' 
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    {errors.date && <p className='error d-flex justify-content-center' style={{color:"red"}}>{errors.date}</p>}
                    
                    <div style={{display:!isMobile?'flex':'',marginTop:'10px',marginBottom:'15px',justifyContent:'center',textAlign:'center'}}>
                        <label className='form-label'>Category :&nbsp;</label>
                            <select  onChange={handleCategoryChange} value={category} >
                                <option>--Select--</option>
                                {renderOption()}
                            </select>
                    </div>
                    {errors.category && <p className='error d-flex justify-content-center' style={{color:"red"}}>{errors.category}</p>}
                   
                    <div style={{display:!isMobile?'flex':'',marginTop:'10px',marginBottom:'15px',justifyContent:'center',textAlign:'center'}}>
                        <label>Amount :&nbsp;</label>
                        <input
                            type='number'
                            value={money}
                            onChange={handleMoneyChange}
                            placeholder='Ex. 40'
                            min="0"  // minimum allowable value
                            max="9999999999"
                        />
                    </div>
                    {errors.money && <p className='error d-flex justify-content-center' style={{color:"red"}}>{errors.money}</p>}
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="button" className="btn btn-success mb-4" onClick={handleSubmit}>Add</button>
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

export default AddExpense