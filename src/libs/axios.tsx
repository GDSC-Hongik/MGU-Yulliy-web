import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
	baseURL: 'https://43.203.225.31.nip.io',
	headers: {
		Authorization: `Bearer ${token}`,
	},
	withCredentials: true,
});

export default instance;
