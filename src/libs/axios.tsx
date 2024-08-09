import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://43.203.225.31.nip.io/',
	withCredentials: true,
});
//마땅한 api가 없었음 ㅜ
export default instance;
