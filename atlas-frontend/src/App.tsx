import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import DashboardPage from './pages/DashboardPage';
import Goals from './pages/Goals';
import GoalCreation from './pages/GoalCreation';
import Progress from './pages/Progress';
import CreateObjective from './pages/CreateObjective';
import { useState } from 'react';
import Login from './pages/Login';


/* 
collor pallete:
bg: zinc-950
card: zinc-900
border: zinc-800

primary: blue-500
accent: cyan-400
text: white / zinc-400 */

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )
  return (
    <>
      {isAuthenticated ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="goals" element={<Goals />} />
              <Route path="GoalCreation" element={<GoalCreation />} />
              <Route path="progress" element={<Progress />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  )
}

export default App;
