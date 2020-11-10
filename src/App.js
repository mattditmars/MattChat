import firebase from 'firebase/app';

import AuthContextProvider from './contexts/AuthContext';
import AppHeader from './components/AppHeader';
import MainContent from './components/MainContent';

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

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppHeader />
        <MainContent />
      </AuthContextProvider>
    </div>
  );
}

export default App;
