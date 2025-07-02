

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import JourneyPage from './pages/JourneyPage';
import MyProgress from './pages/MyProgress';
import ProfilePage from './pages/ProfilePage';
import RegisterForm from './Auth/RegisterForm';
import LoginForm from './Auth/LoginForm';
import Logout from './Auth/Logout';
import Settings from './pages/Settings';
import ResetPassword from './Auth/ResetPassword';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App;