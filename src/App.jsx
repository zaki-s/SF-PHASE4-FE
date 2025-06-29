

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import JourneyPage from './pages/JourneyPage.jsx';
import MyProgress from './pages/MyProgress.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/progress" element={<MyProgress />} />
      </Routes>
    </Router>
  )
}

export default App;