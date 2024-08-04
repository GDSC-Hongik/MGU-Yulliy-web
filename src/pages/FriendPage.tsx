import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import theme from '../styles/theme';
import { useAuth } from '../contexts/AuthProvider';
import Title from '../components/Title';

interface Friend {
	id: number;
	profile: string;
	name: string;
	state: number;
	restourant: number;
}

const FriendPage = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [newFriends, setNewFriends] = useState<Friend[]>([]);
	const { checkUser, user } = useAuth();

	useEffect(() => {
		async function fetchData() {
			await checkUser();
			if (user) {
				const friendResponse = await axios.get('/friends');
				setFriends(friendResponse.data);
				const newFriendResponse = await axios.get('/newfriends');
				setNewFriends(newFriendResponse.data);
			}
		}

		fetchData();
	}, [user]);
	// async function approve(friendId: number) {
	//  {
	// 		await axios.post(`/friends/approve/${friendId}`);
	// 		const approvedFriend = newFriends.find((friend) => friend.id === friendId);
	// 		if (approvedFriend) {
	// 			setFriends([...friends, approvedFriend]);
	// 			setNewFriends(newFriends.filter((friend) => friend.id !== friendId));
	// 		}
	// }
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
				<Title main>Friends</Title>
				<Title>Friends Requests</Title>
				<FriendRequest>
					{newFriends.map((newFriends) => (
						<FriendItem key={newFriends.id}>
							<Profileimage src={newFriends.profile} alt="profile" />
							{newFriends.name} {newFriends.state} {newFriends.restourant}
							<AddButton>
								<FriendButton data-action="approve" onClick={handleClick}>
									Approve
								</FriendButton>
								<FriendButton
									decline
									data-action="decline"
									onClick={handleClick}
								>
									Decline
								</FriendButton>
							</AddButton>
						</FriendItem>
					))}
				</FriendRequest>
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
const FriendRequest = styled.div``;
const AddButton = styled.div`
	box-sizing: border-box;
	height: 54px;
	width: 68px;
	display: flex;
	flex-direction: column;
	margin: 5px;
`;
interface FriendButtonProps {
	decline?: boolean;
}
const FriendButton = styled.button<FriendButtonProps>`
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
