import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCwQ3oYRQwm_MxCoeImiWd4OHdO3H3G8mo",
      authDomain: "chat-app-8a843.firebaseapp.com",
      databaseURL: "https://chat-app-8a843.firebaseio.com",
      projectId: "chat-app-8a843",
      storageBucket: "chat-app-8a843.appspot.com",
      messagingSenderId: "338751244028",
      appId: "1:338751244028:web:6c28bfde4217e45bfdb979",
      measurementId: "G-NM4TVHQK8X"
  });
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MattChat</h1>
        { user ? <SignOut /> : <SignIn /> }
      </header>
      <section>
        { user ? <ChatRoom /> : <LoggedOutHome /> }
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button className="sign-in" onClick={ signInWithGoogle }>Sign In</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

function LoggedOutHome() {
  return (
    <div className="logged-out-home">Sign in with your google account to access the chat room!</div>
  )
}
  
  function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('/messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
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
        <input type="text" placeholder="Chat here..." value={formInput} onChange={ (e) => {setFormInput(e.target.value)}} />
        <button type="submit" disabled={!formInput}>Send</button>
      </form>
    </div>
  )
}

function ChatMessage(props) {
  const { text, userId, photoUrl } = props.message;
  const messageClass = userId === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoUrl} />
      <p>{ text }</p>
    </div>
  )
}

export default App;
