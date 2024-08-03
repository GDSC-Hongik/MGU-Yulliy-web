import { styled } from 'styled-components';
import MoreIcon from '~/assets/icons/MoreIcon';

const Button = styled.button`
	flex-shrink: 0;
	width: 50px;
	height: 50px;
	margin-bottom: 8px;
	background-color: ${({ theme }) => theme.colors.orange};
	color: ${({ theme }) => theme.colors.white};
	border: none;
	font-size: 10px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
	text-align: center;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	filter: drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.2));

	&:hover {
		background-color: ${({ theme }) => theme.colors.grayorange};
		color: ${({ theme }) => theme.colors.white};

		& svg > path {
			fill: ${({ theme }) => theme.colors.white};
		}
	}
`;

const MoreButton = () => {
	const handleClick = () => {
		// TODO: 더보기 버튼 클릭 시 상세 정보 표시
		console.log('MoreButton');
	};

	return (
		<Button onClick={handleClick}>
			<MoreIcon />
			MORE
		</Button>
	);
};

export default MoreButton;
