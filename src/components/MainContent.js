import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ChatRoom from './ChatRoom';
import LoggedOutHome from './LoggedOutHome';

const MainContent = () => {
    const { user } = useContext(AuthContext);

    return ( 
        <section>
            { user ? <ChatRoom /> : <LoggedOutHome /> }
        </section>
     );
}
 
export default MainContent;