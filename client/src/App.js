import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import FamilyList from './pages/FamilyList';
import RegisterFamily from './pages/RegisterFamily';

function App() {
  return(
  <div className="App">
    <Router>
      <Link to = "/RegisterFamily">Enter Family Details  </Link>
      <Link to = "/">Home Page  </Link>
      <Routes>
        <Route path="/" exact Component={FamilyList} />
        <Route path="/RegisterFamily" exact Component={RegisterFamily} />
      </Routes>
    </Router>
    
  </div> 
  )
      
}

export default App;
