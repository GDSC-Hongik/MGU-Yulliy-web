import { useState } from 'react';
import { styled } from 'styled-components';
import ListIcon from '~/assets/icons/ListIcon';
import XIcon from '~/assets/icons/XIcon';
import usePostRestaurant from '~/hooks/api/restaurants/usePostRestarurant';
interface ListButtonProps {
	restaurantId: number;
}

const ListButton: React.FC<ListButtonProps> = ({ restaurantId }) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const { refetch } = usePostRestaurant(restaurantId);

	const addList = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		refetch();
	};

	return (
		<ButtonWrapper $isVisible={isVisible}>
			<Button onClick={addList}>
				<ListIcon />
				맛집 리스트에 추가!
			</Button>
			<CloseButton onClick={() => setIsVisible(false)}>
				<XIcon />
			</CloseButton>
		</ButtonWrapper>
	);
};

export default ListButton;

const ButtonWrapper = styled.div<{ $isVisible: boolean }>`
	display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
	background-color: ${({ theme }) => theme.colors.orange};
	border-radius: 8px;
`;

const Button = styled.button`
	color: ${({ theme }) => theme.colors.white};
	flex: 1;
	height: 60px;
	padding: 8px 16px;
	font-size: 16px;
	border: none;
	background: none;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
`;

const CloseButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	padding: 20px;

	& svg > path {
		stroke: ${({ theme }) => theme.colors.white};
	}
`;
