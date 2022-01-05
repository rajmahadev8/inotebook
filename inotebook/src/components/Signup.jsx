import React,{useState} from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import gif from './iNotebook.gif'
import img from './iNotebook.png'

const Signup = () => {
    const host = "http://localhost:4000"
    let history =   useHistory();
    const [name, setName] = useState({enable:false,Validate:""});
    const [email, setEmail] = useState({enable:false,Validate:""});
    const [password, setPassword] = useState({enable:false,Validate:""});
    const [cpassword, setCpassword] = useState({enable:false,Validate:""});

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const signup = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password: credentials.password})
          });
          const json = await response.json(); 
          console.log(json);
          if(json.success){
              //redirect
              localStorage.setItem('token', json.authToken);
              history.push('/')
          }else{
            if(credentials.name===""){
                setName({enable:true, Validate:"Name required"})
            }else{
                setName({enable:false, Validate:""})
            }
            if(credentials.email===""){
                setEmail({enable:true, Validate:"Email required"})
            }else{
                setEmail({enable:false, Validate:""})
            }
            if(credentials.password===""){
                setPassword({enable:true, Validate:"Password required"})
            }else{
                setPassword({enable:false, Validate:""})
            }
            if(credentials.cpassword===""){
                setCpassword({enable:true, Validate:"Confirm Password required"})
            }else{
                setCpassword({enable:false, Validate:""})
            }
            if(credentials.password!==credentials.cpassword){
                setCpassword({enable:true, Validate:"Password doesn't match"})
                setPassword({enable:true, Validate:"Password doesn't match"})
            }else{
                setCpassword({enable:true, Validate:"Password doesn't match"})
                setPassword({enable:true, Validate:"Password doesn't match"})
            }
            if(credentials.email!==""){
                if(!json.verifyEmail){
                    setEmail({enable:true, Validate:"Email Already Exist"})
                }
            }
          }
        }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <div className='' style={{backgroundImage:`url(${img})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"cover"}}>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{height: ""}}>
            <div className="max-w-md w-full space-y-8 rounded-md shadow-xl p-4 bg-white ">
                <div>
                    <img
                        className="mx-auto h-20 w-auto"
                        src={gif}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                         Already have an Account?{' '}
                        <Link to="/login" className="font-medium text-sky-600 hover:text-sky-500">
                           Log in.
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6  " action="#" method="POST" onSubmit={signup}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px">
                        <div className='mb-3'>
                           <TextField fullWidth name="name" label="Name" error = {name.enable} onChange={onChange}  id="Name" value={credentials.name} helperText={name.Validate}/>
                        </div>
                        <div className='mb-3'> 
                            <TextField fullWidth name="email" error = {email.enable} label="Email" onChange={onChange}  id="Email" value={credentials.email} helperText={email.Validate}/>
                        </div>
                        <div className='mb-3'>
                            <TextField
                                fullWidth
                                error = {password.enable}
                                name="password"
                                inputProps={{ minLength: 5 }}
                                // required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                helperText={password.Validate}
                                value={credentials.password}
                                onChange={onChange}
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                name="cpassword"
                                error = {cpassword.enable}
                                inputProps={{ minLength: 5 }}
                                // required
                                id="c-outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                value={credentials.cpassword}
                                helperText={cpassword.Validate}
                                onChange={onChange}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                                <a href="#" className="font-medium text-sky-600 hover:text-sky-500	">
                                    Forgot your password?
                                </a>
                        </div>
                    </div> */}

                    <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                                // style={{backgroundColor:"#38b6ff"}}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-700" aria-hidden="true" />
                                </span>
                                Sign Up
                            </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Signup
