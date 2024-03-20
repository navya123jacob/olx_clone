

import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Home';
import Create from './Components/Create/Create'
import Post from './store/PostContext';
import View from './Components/View/View'
function App() {

  return (
    <div className="App">
      <Post>
      <BrowserRouter>
      <Routes>
        
        <Route key="home" exact path="/" element={<Home/>}/>
        <Route key="signup" exact path="/signup" element={<Signup/>}/>
        <Route key="login" exact path="/login" element={<Login/>}/>
        <Route key="create" exact path="/create" element={<Create/>}/>
        <Route key="view" exact path="/view" element={<View/>}/>
        
      </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
