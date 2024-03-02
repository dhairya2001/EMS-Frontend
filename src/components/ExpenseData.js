import React,{useState,useEffect, useContext} from 'react'
import { createContext } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';
import { BaseURL } from './BaseURL';

export const ExpData=createContext()

export const ExpenseData=()=> {
    const [data,setData]=useState([]);
    const getCategory = async(e) =>{
        try {
            const token=localStorage.getItem('user.token');
            // console.log(token);
            const result=await axios.get(`${BaseURL}/category`,
            {   
                // params:{type:category},
                headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`}
            })
            .then(json=>setData(json.data));
            if(result){
                // console.log("fetched")
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

  return (
    
        <ExpData.Provider value={{data, setData}}>
            <AddExpense/>
            {/* { children } */}
        </ExpData.Provider>
  )
}
// export default ExpenseData;
export const useExpData=()=>useContext(ExpData);

