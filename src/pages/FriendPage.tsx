import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import NavBar from '~/components/navBar/NavBar';
import theme from '../styles/theme';
import Title from '../components/Title';

interface Friend {
	id: number;
	profile_img: string;
	name: string;
	reliablity: number;
	common_restaurant_count: number;
}

const FriendPage = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [newFriends, setNewFriends] = useState<Friend[]>([]);

	useEffect(() => {
		async function fetchData() {
			const friendResponse = await axios.get('/friends/');
			setFriends(friendResponse.data);
			const newFriendResponse = await axios.get('/newfriends/');
			setNewFriends(newFriendResponse.data);
		}

		fetchData();
	}, []);

	async function accept(friendId: number) {
		await axios.post(`/friends/accept/${friendId}`);
		const acceptedFriend = newFriends.find((friend) => friend.id === friendId);
		if (acceptedFriend) {
			setFriends([...friends, acceptedFriend]);
			setNewFriends(newFriends.filter((friend) => friend.id !== friendId));
		}
	}
	async function decline(friendId: number) {
		try {
			await axios.post(`/friends/decline/${friendId}`);
			setNewFriends(newFriends.filter((friend) => friend.id !== friendId));
		} catch (error) {
			console.error('Error declining friend:', error);
		}
	}

	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const action = e.currentTarget.getAttribute('data-action');
		const friendId = Number(e.currentTarget.value);
		if (action === 'accept') {
			await accept(friendId);
			return;
		} else if (action === 'decline') {
			await decline(friendId);
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
							<Profileimage src={newFriends.profile_img} alt="profile" />
							{newFriends.name} {newFriends.reliablity}{' '}
							{newFriends.common_restaurant_count}
							<AddButton>
								<FriendButton
									data-action="accept"
									value={newFriends.id}
									onClick={handleClick}
								>
									Accept
								</FriendButton>
								<FriendButton
									decline
									data-action="decline"
									value={newFriends.id}
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
							<Profileimage src={friend.profile_img} alt="profile" />
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
