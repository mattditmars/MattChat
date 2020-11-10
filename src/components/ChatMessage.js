import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ChatMessage = (props) => {
    const { auth } = useContext(AuthContext);

    const { text, userId, photoUrl } = props.message;
    const messageClass = userId === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoUrl} />
            <p>{ text }</p>
        </div>
    );
}
 
export default ChatMessage;