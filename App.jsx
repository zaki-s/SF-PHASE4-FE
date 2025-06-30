

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import JourneyPage from './pages/JourneyPage.jsx';
import MyProgress from './pages/MyProgress.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterForm from './Auth/RegisterForm.jsx';
import LoginForm from './Auth/LoginForm.jsx';
import Logout from './Auth/Logout.jsx';
import ResetPassword from './Auth/ResetPassword.jsx';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/reset' element={<ResetPassword />} />
        
      </Routes>
    </Router>
  )
}

export default App;