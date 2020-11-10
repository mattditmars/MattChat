import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const SignOut = () => {
    const { auth } = useContext(AuthContext);

    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    );
}
 
export default SignOut;