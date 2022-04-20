import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login/login';
import AdminDash from './components//Dashboards/admin_dash';
import UserContextProvider from './components/contexts/UserContext';
import ProfessorDashboard from './components/Dashboards/ProfessorDashboard';
import ViewCourse from './components/View Entities/ViewCourse';
import AddSection from './components/Add Entities/AddSection';
import StudentDashboard from './components/Dashboards/StudentDashboard';
import ViewSection from './components/View Entities/ViewSection';
import AddTopic from './components/Add Entities/AddTopic';
import ViewStudent from './components/View Entities/ViewStudent';
import ViewProfessor from './components/View Entities/ViewProfessor';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDash />}/>
            <Route path="/professor" element={<ProfessorDashboard />} />
            <Route path="/professor/view/:professorID" element={<ViewProfessor />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/view/:studentID" element={<ViewStudent />} />
            <Route path="/course/:courseID" element={<ViewCourse />} />
            <Route path="/course/:courseID/addSection" element={<AddSection />} />
            <Route path="/course/:courseID/:sectionID" element={<ViewSection />} />
            <Route path="/course/:courseID/:sectionID/addTopic" element={<AddTopic />} />
          
          </Routes>
        </Router>
      </UserContextProvider>
     
   
    </div>
  );
}

export default App;
