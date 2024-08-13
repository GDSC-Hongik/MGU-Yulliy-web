import { styled } from 'styled-components';
import ReviewContent from '~/components/bottomSheet/reaturantDetail/ReviewContent';
import { Review } from '~/types/restaurants';

interface ReviewsProps {
	reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
	return (
		<>
			<Title>한줄평</Title>
			{reviews.map((review) => (
				<ReviewContent key={review.id} review={review} />
			))}
		</>
	);
};

export default Reviews;

const Title = styled.h4`
	display: inline-block;
	margin-top: 24px;
	font-size: 16px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
	max-width: 100%;
`;
