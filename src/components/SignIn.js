import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {isMobile} from 'react-device-detect';
import firebase from 'firebase/app';
import 'firebase/auth';

const SignIn = () => {
    const { auth } = useContext(AuthContext);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        if(isMobile) {
            auth.signInWithRedirect(provider);
        } else {
            auth.signInWithPopup(provider);
        }
    }
    
    return (
        <button className="sign-in" onClick={ signInWithGoogle }>Sign In</button>
    );
}
 
export default SignIn;