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
	const [newFriendRequests, setFriendRequests] = useState<Friend[]>([]);
	const [recommendFriends, setrecommendFriends] = useState<Friend[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get('/friends');
				setFriends(response.data.friends);
				setFriendRequests(response.data.friend_request);
				setrecommendFriends(response.data.friend_recommend);
			} catch (error) {
				console.log('에러');
				return;
			}
		}
		fetchData();
	}, []);

	async function accept(friendId: number) {
		await axios.post(`/friends/`, {
			action: 'accept',
			friend_id: friendId,
			withCredentials: true,
		});
		const acceptedFriend = newFriendRequests.find(
			(friend) => friend.id === friendId,
		);
		if (acceptedFriend) {
			setFriends([...friends, acceptedFriend]);
			setFriendRequests(
				newFriendRequests.filter((friend) => friend.id !== friendId),
			);
		}
	}
	async function decline(friendId: number) {
		await axios.post(`/friends/`, {
			action: 'decline',
			friend_id: friendId,
			withCredentials: true,
		});
		setFriendRequests(
			newFriendRequests.filter((friend) => friend.id !== friendId),
		);
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
				<Title main={true}>Friends</Title>
				<Title>Friends Requests</Title>
				<FriendList>
					{newFriendRequests.map((newFriendRequest) => (
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
							<Space restourant={true}>
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
				<FriendList>
					{recommendFriends.map((recommendfriend) => (
						<FriendItem friendrequest key={recommendfriend.id}>
							<FriendProfile>
								<Profileimage
									src={`https://43.203.225.31.nip.io${recommendfriend.profile_img}`}
									alt="profile"
								/>
								<Space>
									{recommendfriend.name}
									<Reliability>
										신뢰도 {recommendfriend.reliability}%{' '}
									</Reliability>
								</Space>
							</FriendProfile>
							<Space restourant={true}>
								함께 저장한 식당 {recommendfriend.common_restaurant_count}개
							</Space>
							<FriendButton
								data-action="accept"
								value={recommendfriend.id}
								onClick={handleClick}
							>
								Add
							</FriendButton>
						</FriendItem>
					))}
				</FriendList>
			</Container>
			<NavBar />
		</>
	);
};

export default FriendPage;
const Space = styled.div<SpaceProps>`
	font-size: ${({ restourant }) => (restourant ? '13px' : '15px')};
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
interface SpaceProps {
	restourant?: boolean;
}
const FriendProfile = styled.div`
	display: flex;
	align-items: center;
`;
const Reliability = styled.p`
	color: ${theme.colors.orange};
	font-size: 10px;
	margin-top: 2px;
`;
const FriendButton = styled.button<FriendButtonProps>`
	background-color: ${({ decline }) =>
		decline ? theme.colors.gray : theme.colors.orange};
	color: ${theme.colors.white};
	box-sizing: border-box;
	width: 50px;
	height: 20px;
	font-size: 10px;
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
	box-sizing: border-box;
	border-bottom: 1px solid ${theme.colors.whitegray};
	width: 350px;
	height: 58px;
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
