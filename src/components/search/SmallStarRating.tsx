import { styled } from 'styled-components';
import SmallStar from '~/assets/icons/SmallStar';

type SmallRatingProps = {
	rating: number | null;
};

const RatingWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const RatingText = styled.div`
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
`;

const SmallStarRating: React.FC<SmallRatingProps> = ({ rating }) => {
	rating = rating === null ? 0 : rating;
	return (
		<RatingWrapper>
			<SmallStar />
			<RatingText>{rating.toFixed(1)} / 5.0</RatingText>
		</RatingWrapper>
	);
};

export default SmallStarRating;
