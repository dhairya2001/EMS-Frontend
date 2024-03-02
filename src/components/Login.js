import React,{ useState} from 'react';
import './Login.css';
import SignUp from './SignUp';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import { BaseURL } from './BaseURL';

const validationLogIn = (values) =>{
    let errors={};
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
}

function Login() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        email:'',
        pass:''
    });
    const [errors,setErrors] =useState({});
    const handleChange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value});
    };
    const handleFormSubmit = (e) =>{
        e.preventDefault();
        setErrors(validationLogIn(values));
        auth();
    };

    const auth=async(e)=>{
        const {email,pass}=values;
        try{
            
            const verify=await axios.post(`${BaseURL}/user/logIn`,{email:email,password:pass},
                {
                    headers:{
                        'content-type':'application/json',
                    }
                });
            console.log(verify);
            window.localStorage.setItem('user.token',verify.data.token);
            window.localStorage.setItem('user-name',verify.data.user.name);
           
            if(verify){
                console.log(verify.data.token);
                navigate("/Home");
            }
        }catch(e){
            toast.error('Password or Email is incorrect', {
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
    <form>
    <section className="vh-120 gradient-custom">
        <div className="container py-5 h-50 m-auto">
        <div className="row d-flex justify-content-center align-items-center h-70">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius:'2rem'}}>
            <div className="card-body p-5 text-center">
                <div className="m-auto pb-5">
                <h2 className="fw-bold mb-1 text-uppercase">Expense Managment System</h2>
                <hr/>

                <div className="form-outline form-white m-auto">
                <label className="form-label" ><h4>Email</h4></label>
                    <input 
                        type="email" 
                        id="typeEmailX" 
                        className="form-control form-control-lg" 
                        placeholder='example@mail.com' 
                        name='email'
                        onChange={handleChange}
                        value={values.email} 
                        />
                        {errors.email && <p className='error' style={{color:"red"}}>{errors.email}</p>}
                    
                </div>

                <div className="form-outline form-white mt-2">
                <label className="form-label"  ><h4>Password</h4></label>
                    <input 
                        type="password" 
                        id="typePasswordX" 
                        className="form-control form-control-lg mb-2" 
                        name='pass'
                        placeholder="Enter your password" 
                        value={values.pass} 
                        onChange={handleChange}
                        /> 
                        {errors.pass && <p className='error' style={{color:"red"}}>{errors.pass}</p>}
                </div>

                <button 
                    className="btn btn-outline-light btn-lg px-5 mt-4" 
                    type="submit"
                    onClick={handleFormSubmit}>
                        Log In
                </button>
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
                    <p className="fw-bold ">Don't have an account? &nbsp;
                    <Link to='SignUp' element={<SignUp/>} className="text-white-50 fw-bold">
                    Sign Up
                    </Link>
                    </p>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    </section>
    </form>

  )
}

export default Login