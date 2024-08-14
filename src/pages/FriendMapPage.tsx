import styled from 'styled-components';
import Map from '../components/Map';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BottomSheet from '~/components/bottomSheet/BottomSheet';
import useGetRestaurants from '~/hooks/api/useGetRestaurants';
import { useAtom, useSetAtom } from 'jotai';
import { restaurantAtom, selectedRestaurantIdAtom } from '~/store/restaurants';
import Head from '~/components/common/Head';
import theme from '../styles/theme';
import axios from '../libs/axios';
import BackButton from '~/components/BackButton';
interface Friend {
	id: number;
	name: string;
	profile_img: string;
	reliability: number;
}
const defaultProfile: Friend = {
	id: 0,
	profile_img: '/media/default_profile_img.jpg',
	name: '머거유',
	reliability: 50,
};
const FriendMapPage = () => {
	const [friend, setFriend] = useState<Friend>(defaultProfile);
	const setRestaurants = useSetAtom(restaurantAtom);
	const [selectedId] = useAtom(selectedRestaurantIdAtom);
	const { data, refetch } = useGetRestaurants();
	const { id } = useParams();
	const [showButtons, setShowButtons] = useState(true);

	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

	useEffect(() => {
		async function fetchdata() {
			const res = await axios.get(`/friends/${id}/restaurants`);
			setFriend(res.data.friend);
			setRestaurants(res.data.restaurants);
		}
		if (selectedId !== null) {
			setIsBottomSheetVisible(true);
			window.history.pushState(null, '', '/');
		}
		console.log('selectedId', selectedId);
		refetch();
		fetchdata();
	}, [selectedId, refetch]);

	useEffect(() => {
		setRestaurants(data || []);
	}, [data, setRestaurants]);
	async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const value = e.currentTarget.value;
		if (value == 'like') {
			await axios.post(`/friends/${id}/restaurants/`, { evaluate: 1 });
		} else if (value == 'dislike') {
			await axios.post(`/friends/${id}/restaurants/`, { evaluate: 0 });
		}
		const updatedFriend = await axios.get(`/friends/${id}/restaurants`);
		setFriend(updatedFriend.data.friend);
		setShowButtons(false);
	}
	const handleMapClick = () => {
		setIsBottomSheetVisible(true);
	};
	const handleCloseBottomSheet = () => {
		setIsBottomSheetVisible(false);
	};

	return (
		<>
			<Head title="친구 비밀 지도" />

			<ProfileContainer>
				<BackButton />
				<ProfileImage
					src={`https://43.203.225.31.nip.io${friend?.profile_img}`}
					alt="profile"
				/>
				<Space>
					{friend?.name}
					<Reliability>리스트를 평가해주세요</Reliability>

					{showButtons ? (
						<AddButton>
							<FriendButton value="like" onClick={handleClick}>
								좋아요
							</FriendButton>
							<FriendButton dislike value="dislike" onClick={handleClick}>
								싫어요
							</FriendButton>
						</AddButton>
					) : (
						<Reliability>신뢰도 {friend?.reliability}%</Reliability> // 버튼 클릭 후 나타날 텍스트
					)}
				</Space>
			</ProfileContainer>
			<Container>
				<MapWrapper>
					<Map onClick={handleMapClick} />
				</MapWrapper>
			</Container>
			{isBottomSheetVisible && <BottomSheet onClose={handleCloseBottomSheet} />}
		</>
	);
};

export default FriendMapPage;
const AddButton = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ProfileContainer = styled.div`
	postion: sticky;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 100%;
	height: 130px;
	padding: 20px;
`;
const MapWrapper = styled.div`
	width: 100%;
	height: calc(100vh - 56px); /* 전체 화면에서 56px을 뺀 높이 */
`;
const ProfileImage = styled.img`
	border-radius: 100%;
	box-sizing: border-box;
	width: 80x;
	height: 80px;
	margin: 10px;
`;

const Space = styled.div`
	font-size: 20px;
	gap: 7px;
	display: flex;
	flex-direction: column;
`;
const Reliability = styled.p`
	font-size: 12px;
`;
interface FriendButtonProps {
	dislike?: boolean;
}
const FriendButton = styled.button<FriendButtonProps>`
	background-color: ${({ dislike }) =>
		dislike ? theme.colors.gray : theme.colors.orange};
	color: ${theme.colors.white};
	box-sizing: border-box;
	width: 50px;
	height: 20px;
	font-size: 10px;
	border-radius: 8px;
	border: none;
	margin-right: 10px;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;
