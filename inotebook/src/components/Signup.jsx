import React from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import img from './iNotebook.gif'

const Signup = () => {
    return (
        <div className=''>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{height: "89vh"}}>
            <div className="max-w-md w-full space-y-8 rounded-md shadow-xl p-4 ">
                <div>
                    <img
                        className="mx-auto h-20 w-auto"
                        src={img}
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
                <form className="mt-8 space-y-6  " action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px">
                    <div className='mb-3'>
                            {/* <label htmlFor="name" className="sr-only">
                              Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 m:text-m"
                                placeholder="Name"
                            /> */}
                            <TextField fullWidth name="Name" label="Name" id="Name" />

                        </div>
                        <div className='mb-3'> 
                            {/* <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 m:text-m"
                                placeholder="Email address"
                            /> */}
                            <TextField fullWidth name="Email" label="Email" id="Email" />
                        </div>
                        <div>
                            {/* <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 m:text-m"
                                placeholder="Password"

                            /> */}
                            <TextField
                                fullWidth
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
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
