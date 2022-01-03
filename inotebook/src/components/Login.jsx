import React ,{useState}from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import gif from './iNotebook.gif'
import img from './iNotebook.png'

const Login = () => {
    const host = "http://localhost:4000"
    let history =   useHistory();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const login = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email, password: credentials.password})
          });
          const json = await response.json(); 
          console.log(json);
          if(json.success){
              //redirect
              localStorage.setItem('token', json.authToken);
              history.push('/')

          }
        }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }


    return (
        <div className='' style={{backgroundImage:`url(${img})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"cover"}}>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 " style={{ height: "89vh" }}>
                <div className="max-w-md w-full space-y-8 rounded-md shadow-xl p-4 bg-white">
                    <div>
                        <img
                            className="mx-auto h-20 w-auto"
                            src={gif}
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an Account?{" "}
                            <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-500">
                                Sign up.
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6  " action="#" method="POST" onSubmit={login}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px">
                            <div className='mb-3'>
                                <TextField fullWidth name="email" label="Email" id="Email" value={credentials.email}  onChange={onChange}/>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    // error = {credentials.password===""?true:false}
                                    name="password"
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={credentials.password}
                                    autoComplete="current-password"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            {/* <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div> */}

                            <div className="text-sm">
                                <a href="#" className="font-medium text-sky-600 hover:text-sky-500	">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                                // style={{backgroundColor:"#38b6ff"}}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-700" aria-hidden="true" />
                                </span>
                               LOG IN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
