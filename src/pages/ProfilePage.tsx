import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import Title from '../components/Title';
import theme from '../styles/theme';

interface Profile {
	id: number;
	name: string;
	reliability: number;
	profile_img: string;
	friend_count: number;
}

const defaultProfile: Profile = {
	id: 0,
	profile_img: '/media/default_profile_img.jpg',
	name: '머거유',
	reliability: 50,
	friend_count: 0,
};

const ProfilePage = () => {
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('/profile', { withCredentials: true });
			setProfile(response.data || defaultProfile);
		}
		fetchData();
	}, [profile]);

	if (!profile) {
		return <p>로딩 중</p>;
	}

	return (
		<>
			<Container>
				<Title main={true}>Profile</Title>
				<ProfileContainer>
					<ProfileImage
						src={`https://43.203.225.31.nip.io${profile.profile_img}`}
						alt="profile"
					/>
					<Space>{profile.name}</Space>
					<Space friend_count={true}>친구 {profile.friend_count}명</Space>
					<Space reliability={true}>신뢰도 {profile.reliability}%</Space>
				</ProfileContainer>
			</Container>
			<NavBar
				handleSearchVisible={function (): void {
					throw new Error('Function not implemented.');
				}}
			/>
		</>
	);
};

export default ProfilePage;

const Container = styled.div`
	width: 390px;
	height: 844px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	padding: 20px;
`;

const ProfileImage = styled.img`
	border-radius: 100%;
	box-sizing: border-box;
	width: 150px;
	height: 150px;
	margin: 10px;
`;

interface SpaceProps {
	friend_count?: boolean;
	reliability?: boolean;
}

const Space = styled.div<SpaceProps>`
	margin: 5px;
	font-size: ${({ friend_count, reliability }) =>
		friend_count || reliability ? '13px' : '20px'};
	color: ${({ reliability }) =>
		reliability ? theme.colors.orange : theme.colors.black};
	float: right;
`;

const ProfileContainer = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
