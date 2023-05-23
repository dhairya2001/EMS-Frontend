import React,{useState,useEffect,useMemo} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Grid,Box} from '@mui/material';
import axios from 'axios'
import Home from './Home'
import AddExpense from './AddExpense'
import ViewExpense from './ViewExpense'
import AddCategory from './AddCategory'
import './Home.css'
import useTable from './tableHooks'

function ViewBudget() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [categoryData,setCategoryData]=useState([]);
    const [expenseData,setExpenseData]=useState([]);
    const [month,setMonth]=useState('--Select--');
    const [page,setPage]=useState(1);
    const year=new Date().getFullYear();
    const rows=6;
    const navigate=useNavigate();
    const logOut=()=>{
        navigate('/');
    }
    const getCategory = async(e) =>{
        try {
            const token=localStorage.getItem('user.token');
            const result=await axios.get('http://localhost:5000/category',
            {   
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
            // .then(json=>setCategoryData(json.data));
            if(result){
                setCategoryData(result.data);
                // console.log(result.data);
            }
        } catch (error) {
            console.log(error);
        }
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
                setExpenseData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        let ignore = false;
        
        if (!ignore){
            getCategory();
            getExpenses();
        }
        return () => { ignore = true; }
    },[]);
    
    const handleChange=()=>{
        let list=[];
        
        categoryData.map(cat=>{
            let spent=0;
            expenseData.map(exp=>{
                var d=new Date(exp.date).getMonth();
                if(exp.category===cat.type && monthNames[d]===month ){
                    spent+=exp.money;
                }
            }
        )
       
        list.push([cat.type,spent,cat.limit]);
        })
        if(month==="--Select--"){
            list=[]
        }
        return(list)
    }
    var filterlist=useMemo(handleChange,[categoryData, expenseData, month]);
    console.log(filterlist)
    const {slice,range}=useTable(filterlist,page,rows);
    const renderCard=()=>{
        return slice.map(exp=>{
                let color="lightgreen";
                let lim=exp[2];
                let spent=exp[1];
                if(lim<spent){
                    color="#ff6666"
                }
                if(lim===null){
                    lim="Not Set"
                }
            return(
                <Grid item xs={4}>
                            <Box className=" d-flex justify-content-center">
                            <div className="card mt-2" style={{"width": "80%"}}> 
                                <div className="card-body" style={{"backgroundColor":color}}>
                                    <h5 className="card-title fw-bold">{exp[0]}</h5>
                                    <hr/>
                                    <p className="card-text">Monthly Budget : {exp[2]}</p> 
                                    <p className="card-text">You spent : {exp[1]}</p>
                                </div>
                            </div>
                            </Box>
                    </Grid>
            )
            }
        )
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
            <div className='d-flex justify-content-center mt-4 mb-4'>
                <label><h4>View budget for month of &nbsp;</h4></label>
                <select className='fw-bold' value={month} onChange={e=>setMonth(e.target.value)}>
                    <option>--Select--</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                </select>
                <label><h4>&nbsp; in year {year} &nbsp;</h4></label>
                
            </div>
            <div className='col-xl-1 d-flex justify-content-center' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh'}}
            >
                <button onClick={()=>setPage(page-1)} disabled={page===1?true:false}>
                    
                    Previous
                </button>
            </div>
            <div className='col-xl-10 d-flex justify-content-center'>
                <Grid container spacing={3}>
                    {renderCard()}
                </Grid>
                
            </div>
            <div className='col-xl-1 d-flex justify-content-center' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh'}}
            >
                <button onClick={()=>setPage(page+1)} disabled={page===range[range.length-1]?true:false} >      
                    Next
                    
                </button>
            </div>
        </div>
    </div>
  )
}

export default ViewBudget