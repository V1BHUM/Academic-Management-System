import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login/login';
import AdminDash from './components//Dashboards/admin_dash';
import UserContextProvider from './components/contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDash />}/>
          
          </Routes>
        </Router>
      </UserContextProvider>
     
   
    </div>
  );
}

export default App;
