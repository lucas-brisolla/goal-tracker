interface User {
    id: string;
    email: string;
    password: string;
    password_hash: string;
    level: number;
    xp: number;
}

export default User;