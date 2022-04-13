import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login/login';
import AdminDash from './components//Dashboards/admin_dash';
import UserContextProvider from './components/contexts/UserContext';
import ProfessorDashboard from './components/Dashboards/ProfessorDashboard';
import ViewCourse from './components/View Entities/ViewCourse';
import AddSection from './components/Add Entities/AddSection';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDash />}/>
            <Route path="/professor" element={<ProfessorDashboard />} />
            <Route path="/course/:courseID" element={<ViewCourse />} />
            <Route path="/course/:courseID/addSection" element={<AddSection />} />
          
          </Routes>
        </Router>
      </UserContextProvider>
     
   
    </div>
  );
}

export default App;
