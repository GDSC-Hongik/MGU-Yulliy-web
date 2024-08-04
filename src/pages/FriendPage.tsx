import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';
import theme from '../styles/theme';

interface Friend {
	id: number;
	profile: string;
	name: string;
	email: string;
}

const FriendPage = () => {
	const navigate = useNavigate();
	const [friends, setFriends] = useState<Friend[]>([]);

	useEffect(() => {
		async function checkUser() {
			try {
				const res = await axios.get('/users/me');
				if (res.data) {
					return;
				}
			} catch (error) {
				navigate('/login');
			}
		}
		checkUser();
	}, [navigate]);

	useEffect(() => {
		async function fetchFriends() {
			const response = await axios.get('/friends');
			setFriends(response.data);
		}

		fetchFriends();
	}, []);
	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const action = e.currentTarget.getAttribute('data-action');
		if (action === 'approve') {
			return;
		} else if (action === 'decline') {
			return;
		}
	}
	return (
		<>
			<Container>
				<Title main={true}>Friends</Title>
				<Title>Friends Requests</Title>
				<AddButton>
					<FriendAddButton data-action="approve" onClick={handleClick}>
						Approve
					</FriendAddButton>
					<FriendAddButton decline data-action="decline" onClick={handleClick}>
						Decline
					</FriendAddButton>
				</AddButton>
				<Title>Friends</Title>
				<FriendList>
					{friends.map((friend) => (
						<FriendItem key={friend.id}>
							<Profileimage src={friend.profile} alt="profile" />
							{friend.name}
						</FriendItem>
					))}
				</FriendList>
				<Title>Suggested for you</Title>
			</Container>
			<NavBar />
		</>
	);
};

export default FriendPage;

const AddButton = styled.div`
	box-sizing: border-box;
	height: 54px;
	width: 68px;
	display: flex;
	flex-direction: column;
	margin: 5px;
`;
interface FriendAddButtonProps {
	decline?: boolean;
}
const FriendAddButton = styled.button<FriendAddButtonProps>`
	background-color: ${({ decline }) =>
		decline ? theme.colors.whitegray : theme.colors.orange};
	box-sizing: border-box;
	width: 100%;
	height: 24px;
	margin: 4px;
	border-radius: 8px;
	border: none;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;
interface TitleProps {
	main?: boolean;
}

const Title = styled.p<TitleProps>`
	font-size: ${({ main }) => (main ? '28px' : '20px')};
	text-align: ${({ main }) => (main ? 'center' : 'left')};
	box-sizing: border-box;
	width: 100%;
	margin: 5px;
	height: ${({ main }) => (main ? '28px' : '20px')};
`;

const FriendList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	width: 100%;
	max-width: 600px;
`;

const FriendItem = styled.li`
	padding: 10px;
	box-sizing:border-box;
	border-bottom:1px solid ${theme.colors.whitegray}
	width: 350px;
	height:72px;
	text-align: left;
	text: 16px;
`;
const Profileimage = styled.img`
	border-radius: 100%;
	box-sizing: border-box;
	width: 40px;
	height: 40px;
	margin: 16px;
	margin-left: 12px;
`;
const Container = styled.div`
	width: 390px;
	height: 844px;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
