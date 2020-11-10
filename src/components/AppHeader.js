import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import SignIn from './SignIn';
import SignOut from './SignOut';

const AppHeader = () => {
    const { user } = useContext(AuthContext);

    return ( 
        <header className="App-header">
            <h1>MattChat</h1>
            { user ? <SignOut /> : <SignIn /> }
        </header>
    );
}
 
export default AppHeader;