import axios from 'axios';

const token = import.meta.env.VITE_API_KEY;

axios.defaults.headers.common = {
  'Authorization': `Bearer ${token}`,
  'Accept': 'application/json',
};