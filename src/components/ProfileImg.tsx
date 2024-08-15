import { useEffect, useState } from 'react';
import axios from '~/libs/axios';
import ProfileImg from '~/assets/images/Profile.png';

const useProfileImg = () => {
	const [profileImg, setProfileImg] = useState(ProfileImg);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await axios.get('/profile');
				setProfileImg(`https://43.203.225.31.nip.io${res.data.profile_img}`);
			} catch (error) {
				console.log('에러');
			}
		}
		fetchData();
	}, []);

	return profileImg;
};

export default useProfileImg;
