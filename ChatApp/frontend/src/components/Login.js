import React from 'react';
import { auth, provider } from '../firebase';//for google authentication
import { useStateValue } from '../StateProvider';//reducer part
import { actionTypes } from '../reducer';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import './Login.css'




function Login() {
    //pulling the user information 
    const [{ }, dispatch] = useStateValue();//imported from the state Provider


    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch(error => alert(error.message))




    };



    return (

        <div className='login'>
            {/* <h1>LOGIN</h1> */}
            <div className="login__container">
                <div className="login__text">
                    <h1>SIGN IN </h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>

        </div>
    )
}

export default Login
