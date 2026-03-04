const API_URL ="http://localhost:3333/api";

async function apiFetch(endpoint: string, options: RequestInit = {}){
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
           ...options.headers,
        },
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
        throw new Error('Token expired. Please log in again.');
    } else if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
}

export default apiFetch;