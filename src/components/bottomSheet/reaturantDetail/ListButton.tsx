import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { styled } from 'styled-components';
import ListIcon from '~/assets/icons/ListIcon';
import RemoveListIcon from '~/assets/icons/RemoveListIcon';
import XIcon from '~/assets/icons/XIcon';
import useDelRestaurant from '~/hooks/api/restaurants/useDelRestaurant';
import usePostRestaurant from '~/hooks/api/restaurants/usePostRestarurant';
import { selectedRestaurantIdAtom } from '~/store/restaurants';
interface ListButtonProps {
	restaurantId: number;
	isExist: boolean;
}

const ListButton: React.FC<ListButtonProps> = ({ restaurantId, isExist }) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const setSelectedId = useSetAtom(selectedRestaurantIdAtom);
	const { refetch: postRest } = usePostRestaurant(restaurantId);
	const { refetch: delRest } = useDelRestaurant(restaurantId);

	const addList = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		postRest();
		setSelectedId(null);
	};

	const delList = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault();
		delRest();
		setSelectedId(null);
	};

	return (
		<ButtonWrapper $isVisible={isVisible} $isAdd={isExist}>
			{isExist ? (
				<>
					<RemoveButton onClick={delList}>
						<RemoveListIcon />
						맛집 리스트에서 제거
					</RemoveButton>
				</>
			) : (
				<>
					<AddButton onClick={addList}>
						<ListIcon />
						맛집 리스트에 추가!
					</AddButton>
				</>
			)}
			<CloseButton onClick={() => setIsVisible(false)} $isAdd={isExist}>
				<XIcon />
			</CloseButton>
		</ButtonWrapper>
	);
};

export default ListButton;

const ButtonWrapper = styled.div<{ $isVisible: boolean; $isAdd: boolean }>`
	display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
	justify-content: space-between;
	align-items: center;
	margin-top: 16px;
	background-color: ${({ $isAdd, theme }) =>
		$isAdd ? theme.colors.whitegray : theme.colors.orange};
	border-radius: 8px;
`;

const AddButton = styled.button`
	color: ${({ theme }) => theme.colors.white};
	flex: 1;
	height: 60px;
	padding: 8px 16px;
	border: none;
	background: none;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;

	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
`;

const RemoveButton = styled.button`
	color: ${({ theme }) => theme.colors.orange};
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

	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
`;

const CloseButton = styled.button<{ $isAdd: boolean }>`
	border: none;
	background: none;
	cursor: pointer;
	padding: 20px;

	& svg > path {
		stroke: ${({ $isAdd, theme }) =>
			$isAdd ? theme.colors.orange : theme.colors.white};
	}
`;
