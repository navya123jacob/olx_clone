import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importing context
import { firebaseapp,auth,firestore} from './Firebase/config';
import { FirebaseContext } from './store/FirebaseContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase:firebaseapp,auth:auth,firestore}}>
    <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
export {FirebaseContext};