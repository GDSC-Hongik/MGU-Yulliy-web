import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://learn.codeit.kr/api/link-service',
});
//마땅한 api가 없었음 ㅜ
export default instance;
