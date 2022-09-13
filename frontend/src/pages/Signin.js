import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {UserAuth} from '../context/AuthContext';

import Footer from "../components/Footer";

const Signin = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signIn} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('')
        try {
            await signIn(email,password)
            navigate('/anonymisation')
        }catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }
    return(
        <>
            <div className="d-flex flex-column min-vh-90">
                <div className="container-fluid text-center">
                    <div className="container" style={{marginTop:"10%"}}>
                        <h1 className='text-2xl font-weight-bold py-2'>
                            Sign in to your account
                        </h1>

                    </div>
                    <div>
                        <form on onSubmit={handleSubmit} className='mx-auto w-50'>
                            <div className='d-flex flex-column py2 text-left'>
                                <label className='py-3 font-weight-bold w-25 '> Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email"/>
                            </div>

                            <div className='d-flex flex-column py2 text-left'>
                                <label className='py-3 font-weight-bold w-25'> Password</label>
                                <input onChange={(e)=> setPassword(e.target.value)} className='border p-3' type="password"/>
                            </div>
                            <div className="py-4">

                            </div>
                            <button className='text-center btn-lg button-Info w-95 py-2 my-2 text-white'>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <p className='py-5'>
                        Dont have an account? <Link to='/Signup' className='ins'>Sign up </Link>
                        <br/>
                        <br/>
                        <br/>
                    </p>
                </div>
                <Footer/>
            </div>

        </>
    )
}

export default Signin;