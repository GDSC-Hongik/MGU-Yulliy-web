import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import Title from '../components/Title';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/AuthProvider';

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
	const navigate = useNavigate();
	const { logout } = useAuth();

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('/profile', { withCredentials: true });
			setProfile(response.data || defaultProfile);
		}
		fetchData();
	}, [profile]);
	const handleLogout = () => {
		logout();
		navigate('/login');
		alert('로그아웃되었습니다.');
	};

	const handleClick = () => {
		navigate('/profileedit');
	};
	return (
		<>
			<Container>
				<Title main={true}>Profile</Title>
				<ProfileContainer>
					<ProfileImage
						src={`https://43.203.225.31.nip.io${profile?.profile_img}`}
						alt="profile"
					/>
					<Space>{profile?.name}</Space>
					<Space friend_count={true}>친구 {profile?.friend_count}명</Space>
					<Space reliability={true}>신뢰도 {profile?.reliability}%</Space>
				</ProfileContainer>
				<EditButton onClick={handleClick}>수정하러가기</EditButton>
				<EditButton logout onClick={handleLogout}>
					로그아웃
				</EditButton>
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
interface EditButtonProps {
	logout?: boolean;
}
const EditButton = styled.button<EditButtonProps>`
	background-color: ${({ logout }) =>
		logout ? theme.colors.gray : theme.colors.orange};
	color: ${theme.colors.white};
	box-sizing: border-box;
	width: 100px;
	height: 30px;
	font-size: 14px;
	border-radius: 8px;
	margin-top: ${({ logout }) => (logout ? '5px' : '20px')};
	border: none;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;

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
	width: 160px;
	height: 160px;
	margin: 10px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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
