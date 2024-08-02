// 가로 세로 크기는 68px * 68px 입니다.

import { styled } from 'styled-components';

const ImgWrapper = styled.div`
	width: 68px;
	height: 68px;
`;

const RestaurantImgBox = () => {
	return (
		<ImgWrapper>
			<img src="https://via.placeholder.com/68" alt="restaurantImg" />
		</ImgWrapper>
	);
};

export default RestaurantImgBox;
