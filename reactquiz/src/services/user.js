import axios from 'axios';
const baseUrl = '/api/users';

const register = async (credentials) => {
	const response = await axios.post(baseUrl, credentials);
	return response.data;
};

const getUser = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data;
};

export default { register, getUser };
