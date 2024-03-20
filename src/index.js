import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importing context
import { firebaseapp,auth,firestore,storage} from './Firebase/config';
import { FirebaseContext } from './store/Contexts_olx';
import { Context } from './store/Contexts_olx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase:firebaseapp,auth:auth,firestore,storage:storage}}>
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
export {FirebaseContext};





// Both methods of providing context have their own use cases and advantages. Let's discuss each approach:

// Using Children Props:

// Advantages:
// Flexibility: Allows you to wrap multiple components with the context provider without explicitly defining them within the provider component.
// Explicitness: Clearly indicates which components are being wrapped with the context provider.
// Example:
// jsx
// Copy code
// const ContextProvider = ({ children }) => {
//   // Context provider logic
//   return (
//     <SomeContext.Provider value={someValue}>
//       {children}
//     </SomeContext.Provider>
//   );
// };
// Directly Wrapping Components:

// Advantages:
// Simplicity: Straightforward and concise, especially when you only need to provide context to a single component.
// Readability: Makes it clear which component is directly receiving the context.
// Example:
// jsx
// Copy code
// <SomeContext.Provider value={someValue}>
//   <SomeComponent />
// </SomeContext.Provider>
// Which method to use depends on the specific requirements and structure of your application:

// If you need to wrap multiple components or want to provide context to components dynamically based on certain conditions, using the children prop approach is more flexible.
// If you only need to provide context to a single component or want a more straightforward approach, directly wrapping the component can be simpler.
// Both methods are valid and widely used in React applications, so you can choose the one that best fits your needs and preferences.