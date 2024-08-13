import { useSetAtom } from 'jotai';
import styled from 'styled-components';
import BackwordIcon from '~/assets/icons/BackwordIcon';
import { selectedRestaurantIdAtom } from '~/store/restaurants';

const BackButton = () => {
	const setSelectedId = useSetAtom(selectedRestaurantIdAtom);
	const clickHandler = () => {
		setSelectedId(null);
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
	top: -30px;
	width: 24px;
	height: 24px;
	margin-bottom: 8px;
	background-color: ${({ theme }) => theme.colors.white};
	border: none;
	font-size: 10px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
	text-align: center;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	& svg > path {
		stroke: ${({ theme }) => theme.colors.black};
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.whitegray};
		& svg > path {
			stroke: ${({ theme }) => theme.colors.gray};
		}
	}
`;
