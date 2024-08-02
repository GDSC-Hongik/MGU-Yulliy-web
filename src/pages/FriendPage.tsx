import styled from 'styled-components';
import { useEffect } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '~/components/navBar/NavBar';

const FriendPage = () => {
	const navigate = useNavigate();
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
	return (
		<>
			<Container></Container>
			<NavBar />
		</>
	);
};

export default FriendPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
