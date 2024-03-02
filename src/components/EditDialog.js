import React,{useState} from 'react';
import './Home.css';
import axios from 'axios';
import { BaseURL } from './BaseURL';

const EditDialog=(props)=>{
    const [selectedExpenseValue, setSelectedExpenseValue] = useState(null);
    const [selectedExpenseCategory,setSelectedExpenseCategory] = useState(null);
    const [inputValue, setInputValue] = useState(props.exp.money);
    const originalDate = props.exp.date;

    const formattedDate = new Date(originalDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const editExpense=(cat,date,money)=>{

        try{
            const token=localStorage.getItem('user.token');
            axios.put(`${BaseURL}/ems/${props.exp._id}`,{category:cat,date:date,money:money},{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`}
            })
        } catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <div className="overlay">
                <div className="dialog">
                {/* Your dialog content goes here */}
                <p style={{fontWeight:'bold'}}>Edit {props.exp.category} expense dated {formattedDate}</p>
                Rs. <input defaultValue={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></input>
                <br/>
                <br/>
                <button onClick={props.fun}>Close</button> <button onClick={()=>{editExpense(props.exp.category,props.exp.date,inputValue)}}>Edit</button>
            </div>
        </div>
        </>
    )
}
export default EditDialog;