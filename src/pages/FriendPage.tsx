import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';

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

	return (
		<>
			<Title> friends</Title>
			<FriendList>
				{friends.map((friend) => (
					<FriendItem key={friend.id}>
						{friend.profile} {friend.name}
					</FriendItem>
				))}
			</FriendList>
			<NavBar />
		</>
	);
};

export default FriendPage;

// 스타일링

const Title = styled.p`
	margin: 20px 0;
	font-size: 24px;
	text-align:left;
	box-sizing:border-box:
	width:350px;
	height:100%;
	padding:20px;
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
	border-bottom: 1px solid #ccc;
	width: 100%;
	text-align: center;
`;
