import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import Title from '../components/Title';

interface Profile {
	name: string;
	reliability: number;
	profile_img: string;
	friend_count: number;
}

const ProfilePage = () => {
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		async function fetchProfileData() {
			try {
				const response = await axios.get('/profile');
				setProfile(response.data.profile);
			} catch (error) {
				console.error('Error fetching profile data', error);
			}
		}
		fetchProfileData();
	}, []);

	if (!profile) {
		return <div>Loading...</div>;
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
					<Space friend_count={true}>{profile.friend_count}</Space>
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
	justify-content: center;
	margin: auto;
`;

const ProfileImage = styled.img`
	border-radius: 100%;
	box-sizing: border-box;
	width: 150px;
	height: 150px;
`;

interface SpaceProps {
	friend_count?: boolean;
}

const Space = styled.div<SpaceProps>`
	font-size: ${({ friend_count }) => (friend_count ? '13px' : '15px')};
	float: right;
`;

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
