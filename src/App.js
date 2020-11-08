import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyCwQ3oYRQwm_MxCoeImiWd4OHdO3H3G8mo",
    authDomain: "chat-app-8a843.firebaseapp.com",
    databaseURL: "https://chat-app-8a843.firebaseio.com",
    projectId: "chat-app-8a843",
    storageBucket: "chat-app-8a843.appspot.com",
    messagingSenderId: "338751244028",
    appId: "1:338751244028:web:6c28bfde4217e45bfdb979",
    measurementId: "G-NM4TVHQK8X"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        { user ? <ChatRoom /> : <SignIn /> }
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
    <button onClick={ signInWithGoogle}>Sign in with google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
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
  };

  return (
    <div>
      <SignOut />
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />) }
      </div>
      <form onSubmit={ sendMessage }>
        <input value={formInput} onChange={ (e) => {setFormInput(e.target.value)}} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

function ChatMessage(props) {
  const { text, userId, photoUrl } = props.message;

  return (
    <div>

      <img src={photoUrl} />
      <p>{ text }</p>
    </div>
  )
}

export default App;
