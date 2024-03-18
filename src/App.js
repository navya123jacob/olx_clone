
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route key="home" exact path="/" element={<Home/>}/>
        <Route key="signup" exact path="/signup" element={<Signup/>}/>
        <Route key="login" exact path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
