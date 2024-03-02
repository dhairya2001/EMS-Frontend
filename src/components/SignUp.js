import React,{useState} from 'react';
import './Login.css';
import Login from './Login';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { BaseURL } from './BaseURL';

const validationSignUp=(values)=>{
    let errors={};
    if(!values.name){
        errors.name="Name is Required";
    }
    if(!values.email){
        errors.email="Email is Required";
    }
    if(!values.pass){
        errors.pass="Password is Required";
    }
    else if(values.pass.length<=4){
        errors.pass="Password should be more than four characters";
    }
    return errors;
};

function SignUp() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        email:'',
        pass:'',
        name:''
    });
    const [errors,setErrors] =useState({});
    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value});
    };
    const handleFormSubmit = (e) =>{
        e.preventDefault();
        setErrors(validationSignUp(values));
        auth();
    };

    const auth=async(e)=>{
        const {email,pass,name}=values;
        try{
            
            const verify=await axios.post(`${BaseURL}/user/signUp`,{email:email,password:pass,name:name},
                {
                    headers:{
                        'content-type':'application/json'
                    }
                });
            window.localStorage.setItem('user.token',verify.data.token);
           
            if(verify){
                toast.success('Account Created');
                navigate("/");
            }
        }catch(e){
            toast.error('Enter all Details OR User Already Exists', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
                });
            console.log(e);
        }
    }
  return (
    <section className="vh-100 gradient-custom">
        <div className="container py-5   h-50 m-auto">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius:'2rem'}}>
            <div className="card-body p-5 text-center">
                
                <div className="m-auto pb-5">
                <h2 className="fw-bold mb-1 text-uppercase">Expense Managment System</h2>
                <hr/>
                
                <div className="form-outline form-white mt-2">
                <label className="form-label" ><h4>Name</h4></label>
                    <input 
                        type="text" 
                        id="typeNameX" 
                        className="form-control form-control-lg mb-2" 
                        placeholder='Enter Your Name' 
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className='error' style={{color:"red"}}>{errors.name}</p>}
                </div>

                <div className="form-outline form-white m-auto">
                <label className="form-label" ><h4>Email</h4></label>
                    <input 
                        type="email" 
                        id="typeEmailX" 
                        className="form-control form-control-lg mb-2" 
                        placeholder='example@mail.com' 
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className='error' style={{color:"red"}}>{errors.email}</p>}
                </div>

                <div className="form-outline form-white m-auto">
                    <label className="form-label" ><h4>Password</h4></label>
                    <input 
                        type="password"
                        name='pass' 
                        id="typePasswordX" 
                        className="form-control form-control-lg" 
                        placeholder="Enter your password"
                        value={values.pass}
                        onChange={handleChange}
                        required    
                    />
                        {errors.pass && <p className='error' style={{color:"red"}}>{errors.pass}</p>}
                </div>
                <button 
                    className="btn btn-outline-light btn-lg px-5 mt-4"  
                    type="submit"
                    onClick={handleFormSubmit}
                >Sign Up</button>
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
                    <p className="fw-bold mt-2 mb-0">Already have an account &nbsp;  
                    <Link to='/' element={<Login/>} className="text-white-50 fw-bold">
                    Login
                    </Link>
                    </p>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    </section>
  )
}

export default SignUp