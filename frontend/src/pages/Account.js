import React from 'react';
import {useNavigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import Footer from "../components/Footer";

const Account = () =>{
    const{user,logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            await logout()
            navigate('/')
            console.log('You are logged out')
        }catch (e) {
            console.log(e.message)
        }
    }

    return(
        <>
            <div className="d-flex flex-column min-vh-90">

                <main style={{alignSelf: "center", minHeight: "70vh", marginTop: "10%" }}>




                    <div className="container">
                        <h1 className='text-2xl font-weight-bold py-2'>Account</h1>
                        <p>User Email: {user && user.email}</p>
                    </div>


                </main>
                <Footer/>
            </div>

        </>
    )
}

export default Account;