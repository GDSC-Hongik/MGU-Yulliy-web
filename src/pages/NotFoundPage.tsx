import { styled } from 'styled-components';
import NotFoundImg from '/images/404.png';
import { useNavigate } from 'react-router-dom';
import Head from '~/components/common/Head';

const NotFoundWarpper = styled.div`
	background-color: ${({ theme }) => theme.colors.whitegray};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100vh;

	gap: 20px;
`;

const Image = styled.img`
	width: 300px;
	height: 300px;
	border-radius: 50%;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
	box-sizing: border-box;
	background-color: ${({ theme }) => theme.colors.orange};
	border: none;
	border-radius: 50px;
	color: ${({ theme }) => theme.colors.white};
	cursor: pointer;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
	font-size: 16px;
	padding: 5px;
	padding-left: 16px;
	margin-top: 15px;
	width: 250px;
	height: 50px;
	&:hover,
	&:active {
		background-color: ${({ theme }) => theme.colors.grayorange};
		color: ${({ theme }) => theme.colors.black};
	}
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const NotFoundPage = () => {
	const navigate = useNavigate();

	const HandlebuttonClick = () => {
		navigate('/');
	};

	return (
		<>
			<Head title="404 Not Found" />
			<NotFoundWarpper>
				<Image src={NotFoundImg} alt="404 not found" />
				<Button onClick={HandlebuttonClick} type="button">
					돌아가기
				</Button>
			</NotFoundWarpper>
		</>
	);
};

export default NotFoundPage;
