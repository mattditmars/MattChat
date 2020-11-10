import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ChatMessage from './ChatMessage';

const ChatRoom = () => {
    const { auth } = useContext(AuthContext);
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection('/messages');
    const query = messagesRef.orderBy('createdAt').limit(35);
    const [messages] = useCollectionData(query, {idField: 'id'});
    
    const dummy = useRef();
    const [formInput, setFormInput] = useState("");

    const sendMessage = async(e) => {
        setFormInput('');
        e.preventDefault();
        const { uid, photoURL, } = auth.currentUser;

        await messagesRef.add(
            {
                text: formInput,
                photoUrl: photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                userId: uid,
            }
        );
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return ( 
        <div>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />) }
                <span ref={dummy}></span>
            </main>
            <form onSubmit={ sendMessage }>
                <input type="text" placeholder="Chat here..." value={formInput}
                    onChange={ (e) => {setFormInput(e.target.value)}} />
                <button type="submit" disabled={!formInput}>Send</button>
            </form>
        </div>
    );
}
 
export default ChatRoom;