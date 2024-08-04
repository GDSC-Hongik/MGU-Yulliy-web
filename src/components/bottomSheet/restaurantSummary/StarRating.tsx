import { styled } from 'styled-components';
import FullStar from '~/assets/ratingStar/FullStar';
import HalfStar from '~/assets/ratingStar/HalfStar';
import VoidStar from '~/assets/ratingStar/VoidStar';

type StarRatingProps = {
	rating: number | null; // 5.0 만점 기준의 평점
};

const StarWrapper = styled.div`
	display: flex;
	gap: 8px;
`;

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	if (rating === null) {
		rating = 0;
	}

	const fullStars = Math.floor(rating); // 정수 부분의 개수 (FullStar 개수)
	const halfStar = rating % 1 >= 0.5; // 0.5점 이상일 경우 HalfStar 사용
	const voidStars = 5 - fullStars - (halfStar ? 1 : 0); // 나머지 VoidStar 개수
	return (
		<StarWrapper>
			{[...Array(fullStars)].map((_, index) => (
				<FullStar key={`full-${index}`} />
			))}
			{halfStar && <HalfStar />}
			{[...Array(voidStars)].map((_, index) => (
				<VoidStar key={`void-${index}`} />
			))}
		</StarWrapper>
	);
};

export default StarRating;
