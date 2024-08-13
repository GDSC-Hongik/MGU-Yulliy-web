// 가로 세로 크기는 68px * 68px 입니다.

import { styled } from 'styled-components';

interface ImgProps {
	imgUrl: string;
}

const RestaurantImgBox: React.FC<ImgProps> = ({ imgUrl }) => {
	return <Img src={imgUrl} alt="restaurantImg" />;
};

export default RestaurantImgBox;

const Img = styled.img`
	width: 68px;
	height: 68px;
	object-fit: cover;
`;
