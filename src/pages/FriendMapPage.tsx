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
import SmallButton from '~/components/SmallButton';
interface Friend {
	id: number;
	name: string;
	profile_img: string;
	reliability: number;
	is_evaluated: boolean;
}
const defaultProfile: Friend = {
	id: 0,
	profile_img: '/media/default_profile_img.jpg',
	name: '머거유',
	reliability: 50,
	is_evaluated: false,
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
			if (res.data.friend.is_evaluated === true) {
				setShowButtons(false);
			}
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

					{showButtons ? (
						<>
							<Reliability>리스트를 평가해주세요</Reliability>
							<AddButton>
								<SmallButton value="like" onClick={handleClick}>
									좋아요
								</SmallButton>
								<SmallButton decline value="dislike" onClick={handleClick}>
									싫어요
								</SmallButton>
							</AddButton>
						</>
					) : (
						<Reliability real={true}>신뢰도 {friend?.reliability}%</Reliability>
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
	box-sizing: border-box;
	border: 1px;
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
	margin: 13px;
`;

const Space = styled.div`
	font-size: 20px;
	gap: 7px;
	display: flex;
	flex-direction: column;
`;
interface ReliabilityProps {
	real?: boolean;
}
const Reliability = styled.p<ReliabilityProps>`
	font-size: 12px;
	font-weight: ${({ real }) =>
		real ? theme.fontWeights.Bold : theme.fontWeights.Normal};
	color: ${({ real }) => (real ? theme.colors.orange : theme.colors.black)};
`;
