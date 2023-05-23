import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './table.css'
import { Link,useNavigate } from 'react-router-dom'
import Home from './Home'
import AddExpense from './AddExpense'
import AddCategory from './AddCategory'
import ViewBudget from './ViewBudget'
import './Home.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import useTable from './tableHooks';

function ViewExpense() {
    const navigate=useNavigate();
    const logOut=()=>{
        window.localStorage.removeItem('user.token');
        navigate("/");
    }

    const [category,setCategory]=useState('All');
    const [startDate,setStartDate]=useState('');
    const [endDate,setEndDate]=useState('');
    const [categoryData,setCategoryData]=useState([]);
    const [expense,setExpense]=useState([]);
    const [page,setPage]=useState(1); 
    let id=0,p=0;

    const handleStartDateChange=(e)=>{
        setStartDate(e.target.value);
    }
    const handleEndDateChange=(e)=>{
        setEndDate(e.target.value);
    }
    const handleCategoryChange=(e)=>{
        setCategory(e.target.value);
    }

    const getCategory = async(e) =>{
        try {
            const token=localStorage.getItem('user.token');
            const result=await axios.get('http://localhost:5000/category',
            {   
                params:{type:category},
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
            .then(json=>setCategoryData(json.data));
            if(result){
                console.log("fetched")
            }
            
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

    const getExpenses=async(e)=>{
        try {
            const token=localStorage.getItem('user.token');
            console.log(token);
            const result=await axios.get('http://localhost:5000/ems',
            { 
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
            if(result){
                setExpense(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange=()=>{
        if(category!=="All" && startDate!=='' && endDate!==''){
            return expense.filter(item=>item.category===category && (new Date(item.date)>=new Date(startDate) ) && (new Date(item.date)<=new Date(endDate)))
        }
        else if(category!=="All" && endDate!==''){
            return expense.filter(item=>item.category===category && (new Date(item.date)<=new Date(endDate) ) )
        }
        else if(category!=="All" && startDate!==''){
            return expense.filter(item=>item.category===category && (new Date(item.date)>=new Date(startDate) ) )
        }
        else if(category!=='All'){
            return expense.filter(item=>item.category===category);
        }
        else if(category==="All" && startDate!=='' && endDate!==''){
            return expense.filter(item=>(new Date(item.date)>=new Date(startDate) ) && (new Date(item.date)<=new Date(endDate)))
        }
        else if(category==="All" && endDate!==''){
            return expense.filter(item=> (new Date(item.date)<=new Date(endDate) ) )
        }
        else if(category==="All" && startDate!==''){
            return expense.filter(item=>(new Date(item.date)>=new Date(startDate) ) )
        }
        else if(category==='All'){
            return expense
        }
        else{
            return expense;
        }
        
    }
    const editExp=()=>{
        console.log("edit")
    }
    const deleteExp=(id)=>{
        try {
            const token=localStorage.getItem('user.token');
            axios.delete(`http://localhost:5000/ems/${id}`,
            { 
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
        } catch (error) {
            console.log(error)
        }
    }
    var filterlist=useMemo(handleChange,[category,expense,startDate,endDate]);
    const {slice,range}=useTable(filterlist,page,7);
    const renderTable=()=>{
        return slice.map(exp=>{
            id+=1;p=(page-1)*7;
            var d=new Date(exp.date);
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var newDate = date + "/" + month + "/" + year;
            var temp=exp._id;
            return(
                <tr>
                    <td>{id+p}</td>
                    <td>{newDate}</td>
                    <td>{exp.category}</td>
                    <td>{exp.money}</td>
                    <td><EditIcon onClick={editExp}/>&nbsp;&nbsp;&nbsp;&nbsp;<DeleteIcon  onClick={()=>deleteExp(temp)}/></td>
                </tr>
            )
            }
        )
    }
    useEffect(()=>{
        let ignore=false;
        if(!ignore){
            getExpenses();
        }
        return () => { ignore = true; }
    },[expense])

    const handlePrev=()=>{
        setPage(page-1);        
    }
    const handleNext=()=>{
        setPage(page+1);
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
            <div className='d-flex justify-content-center mt-4'>
                
                <label>Category :&nbsp;</label>
                <select onChange={handleCategoryChange} value={category}>
                    
                    <option>All</option>
                    {renderOption()}
                </select>
                
                <label>From :&nbsp;</label>
                <input
                            type='date' 
                            value={startDate}
                            onChange={handleStartDateChange}
                />

                <label>To :&nbsp;</label>
                <input
                            type='date'
                            value={endDate}
                            onChange={handleEndDateChange}
                />
            </div>
                <div className='col-xl-2 d-flex justify-content-center' 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh'
                        }}>
                            <button onClick={handlePrev} disabled={page===1?true:false} ><KeyboardDoubleArrowLeftIcon/>Previous</button>
                    
                </div>
                <div className="col-xl-8 ">
                    <div className='tableFixHead d-flex justify-content-center mt-4'>
                        <table id="expenses" className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date &nbsp;</th>
                                <th>Category &nbsp;</th>
                                <th>Amount &nbsp;</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody >
                                
                                {renderTable()}
                                
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className='col-xl-2 d-flex justify-content-center'style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                        }}>
                    <button onClick={handleNext} disabled={page===range[range.length-1]?true:false}
                        
                    >Next<KeyboardDoubleArrowRightIcon/></button>
                    
                </div>
        </div>
    </div>
  )
}

export default ViewExpense