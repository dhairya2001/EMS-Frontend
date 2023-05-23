import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AddExpense from './components/AddExpense'
import AddCategory from './components/AddCategory';
import ViewExpense from './components/ViewExpense';
import ViewBudget from './components/ViewBudget';
  
function App() {
  
  return (
    <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='SignUp' element={<SignUp/>}/>
      <Route path='Home' element={<Home/>}/>
      <Route path='add/expense' element={<AddExpense/>}/>
      <Route path="add/category" element={<AddCategory/>}/>
      <Route path="view/expense" element={<ViewExpense/>}/>
      <Route path="view/budget" element={<ViewBudget/>}/>
    </Routes>
  );
}

export default App;
