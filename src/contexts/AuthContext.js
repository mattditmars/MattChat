import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    return ( 
        <AuthContext.Provider value={{ auth, user }}>
            { props.children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;