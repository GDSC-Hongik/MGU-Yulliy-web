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
	reliability: number;
	common_restaurant_count?: number;
}

const FriendPage = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [newFriendRequestsRequests, setFriendRequests] = useState<Friend[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('인증 토큰이 없습니다. 로그인해 주세요.');
				}

				const response = await axios.get('/friends/');
				setFriends(response.data.friends);
				setFriendRequests(response.data.friend_request);
			} catch (error) {
				console.log('에러');
				return;
			}
		}
		fetchData();
	}, []);

	async function accept(friendId: number) {
		await axios.post(`/friends/accept/${friendId}`);
		const acceptedFriend = newFriendRequestsRequests.find(
			(friend) => friend.id === friendId,
		);
		if (acceptedFriend) {
			setFriends([...friends, acceptedFriend]);
			setFriendRequests(
				newFriendRequestsRequests.filter((friend) => friend.id !== friendId),
			);
		}
	}
	async function decline(friendId: number) {
		try {
			await axios.post(`/friends/decline/${friendId}`);
			setFriendRequests(
				newFriendRequestsRequests.filter((friend) => friend.id !== friendId),
			);
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
				<FriendList>
					{newFriendRequestsRequests.map((newFriendRequest) => (
						<FriendItem friendrequest key={newFriendRequest.id}>
							<FriendProfile>
								<Profileimage
									src={`https://43.203.225.31.nip.io${newFriendRequest.profile_img}`}
									alt="profile"
								/>
								<Space>
									{newFriendRequest.name}
									<Reliability>
										신뢰도 {newFriendRequest.reliability}%{' '}
									</Reliability>
								</Space>
							</FriendProfile>
							<Space>
								함께 저장한 식당 {newFriendRequest.common_restaurant_count}개
							</Space>
							<AddButton>
								<FriendButton
									data-action="accept"
									value={newFriendRequest.id}
									onClick={handleClick}
								>
									Accept
								</FriendButton>
								<FriendButton
									decline
									data-action="decline"
									value={newFriendRequest.id}
									onClick={handleClick}
								>
									Decline
								</FriendButton>
							</AddButton>
						</FriendItem>
					))}
				</FriendList>
				<Title>Friends</Title>
				<FriendList>
					{friends.map((friend) => (
						<FriendItem key={friend.id}>
							<FriendProfile>
								<Profileimage
									src={`https://43.203.225.31.nip.io${friend.profile_img}`}
									alt="profile"
								/>
								<Space>{friend.name}</Space>
							</FriendProfile>
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
const Space = styled.div`
	font-size: 14px;
	float: right;
`;
const AddButton = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;
interface FriendButtonProps {
	decline?: boolean;
}
interface FriendItemProps {
	friendrequest?: boolean;
}
const FriendProfile = styled.div`
	display: flex;
	align-items: center;
`;
const Reliability = styled.p`
	color: ${theme.colors.orange};
	font-size: 10px;
`;
const FriendButton = styled.button<FriendButtonProps>`
	background-color: ${({ decline }) =>
		decline ? theme.colors.whitegray : theme.colors.orange};
	box-sizing: border-box;
	width: 50px;
	height: 20px;
	font-size: 12px;
	border-radius: 8px;
	margin: 2px;
	border: none;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;

const FriendList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	max-width: 600px;
`;

const FriendItem = styled.li<FriendItemProps>`
	display: flex;
	align-items: center;
	justify-content: ${({ friendrequest }) =>
		friendrequest ? 'space-between' : 'flex-start'};
	gap: 15px;
	padding: 5px;
	box-sizing: border-box;
	border-bottom: 1px solid ${theme.colors.whitegray};
	width: 350px;
	height: 50px;
	text-align: left;
`;
const Profileimage = styled.img`
	border-radius: 100%;
	box-sizing: border-box;
	width: 40px;
	height: 40px;
	margin-right: 15px;
	margin-left: 12px;
`;
const Container = styled.div`
	width: 390px;
	height: 844px;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;
