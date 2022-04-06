import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login';
import Admin_Dash from './components/admin_dash';
import UserContextProvider from './components/contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin_Dash />}/>
          
          </Routes>
        </Router>
      </UserContextProvider>
     
   
    </div>
  );
}

export default App;
