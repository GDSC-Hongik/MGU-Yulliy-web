import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import Title from '../components/Title';
import theme from '../styles/theme';
import Input from '~/components/Input';

interface Profile {
	id: number;
	name: string;
	reliability: number;
	profile_img: string;
	friend_count: number;
}

const ProfileEditPage = () => {
	const [, setProfile] = useState<Profile | null>(null);
	const [newName, setNewName] = useState<string>('');
	const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get('/profile', { withCredentials: true });
			setNewName(response.data.name);
			setNewProfileImage(response.data.profile_img);
		}
		fetchData();
	}, []);

	const handleClick = async () => {
		const formData = new FormData();
		formData.append('name', newName);
		if (newProfileImage) {
			formData.append('profile_img', newProfileImage);
		}

		const response = await axios.patch(`/profile/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
		});
		setProfile(response.data);
		alert('프로필이 수정되었습니다!');
	};
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setNewProfileImage(e.target.files[0]);
		}
	};

	return (
		<>
			<Container>
				<Title main={true}>Profile</Title>
				<ProfileContainer>
					<Space>프로필 사진 수정</Space>
					<ImageInput
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>
					<Space>별명 수정</Space>
					<Input
						type="text"
						value={newName}
						onChange={handleNameChange}
						placeholder="이름을 입력하세요"
					/>
					<EditButton onClick={handleClick}>수정하기</EditButton>
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

export default ProfileEditPage;

const Container = styled.div`
	width: 390px;
	height: 844px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	padding: 20px;
`;
interface SpaceProps {
	friend_count?: boolean;
	reliability?: boolean;
}

const Space = styled.div<SpaceProps>`
	text-align: left;
	width: 100%;
	margin: 10px;
	margin-left: 20px;
`;
const ImageInput = styled.input`
	margin-bottom: 20px;
	padding: 8px;
	font-size: 16px;
`;
const ProfileContainer = styled.div`
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const EditButton = styled.button`
	background-color: ${theme.colors.orange};
	color: ${theme.colors.white};
	box-sizing: border-box;
	width: 100px;
	height: 30px;
	font-size: 14px;
	border-radius: 8px;
	margin-top: 30px;
	border: none;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;
