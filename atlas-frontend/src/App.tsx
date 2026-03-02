import './App.css'
import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )
  return (
    <>
      {isAuthenticated ? (
        <h1>Usuário logado</h1>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
    )
}

export default App;
