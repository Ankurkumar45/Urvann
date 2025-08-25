const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://urvann-mini-plant-store.onrender.com'
    : 'http://localhost:5000';

export default API_URL;