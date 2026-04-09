import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import WeeklySummary from './pages/WeeklySummary';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/checkin' element={<CheckIn />} />
          <Route path='/summary' element={<WeeklySummary />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}