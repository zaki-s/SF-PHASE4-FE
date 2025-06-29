

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import JourneyPage from './pages/JourneyPage.jsx';
import MyProgress from './pages/MyProgress.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App;