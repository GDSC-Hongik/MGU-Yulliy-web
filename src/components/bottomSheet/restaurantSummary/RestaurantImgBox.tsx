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
