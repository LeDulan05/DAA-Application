import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';  
import SidebarLayout from "./pages/sideBar";
import RegisterFamily from './pages/registerFamily';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with Sidebar */}
          <Route element={<SidebarLayout />}>
            
          
            <Route path="/register-family" element={<RegisterFamily />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
