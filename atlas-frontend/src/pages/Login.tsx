import { useState } from 'react';
import auth from '../api/auth';

type LoginProps = {
    onLogin: () => void;
}


function Login({ onLogin }: LoginProps){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        try {
            await auth.login(email, password);
            onLogin();
            alert('Login successful!'); // Replace with actual navigation to dashboard
        } catch (err: any) {
            setError(err.message);
        }
    }

return (
    <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Log In</button>
        </form>
    </div>);
}




export default Login;