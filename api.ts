import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.example.com',
});

export const authenticateUSer = async (email: string, password:string) => {
    const response = await api.post('/login', {email, password});
    return response.data;
}