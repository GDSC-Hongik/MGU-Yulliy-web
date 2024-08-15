import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '~/libs/axios';
import ProfileImg from '~/assets/images/Profile.png';

const ProfileIcon = () => {
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

	return <StyledProfileIcon profileImg={profileImg} />;
};

export default ProfileIcon;

const StyledProfileIcon = styled.div<{ profileImg: string }>`
	background-image: url(${({ profileImg }) => profileImg});
	width: 24px;
	height: 24px;
	background-size: cover; /* 이미지가 div를 덮도록 설정 */
	background-position: center; /* 이미지가 div의 중앙에 위치하도록 설정 */
	outline: 0px solid ${({ theme }) => theme.colors.gray};
	border-radius: 50%;
`;
