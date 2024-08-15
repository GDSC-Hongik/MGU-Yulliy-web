import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackwordIcon from '~/assets/icons/BackwordIcon';

const BackButton = () => {
	const navigate = useNavigate();
	const clickHandler = () => {
		navigate(-1);
	};

	return (
		<Button onClick={clickHandler}>
			<BackwordIcon />
		</Button>
	);
};

export default BackButton;

const Button = styled.button`
	position: absolute;
	top: 10px;
	left: 360px;
	z-index: 10;
	width: 24px;
	height: 24px;
	margin-bottom: 8px;
	background-color: ${({ theme }) => theme.colors.white};
	border: none;
	font-size: 10px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
	border-radius: 4px;
	gap: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.whitegray};
		& svg > path {
			stroke: ${({ theme }) => theme.colors.gray};
		}
	}
`;
