import { styled } from 'styled-components';
import ReviewContent from '~/components/bottomSheet/reaturantDetail/ReviewContent';
import ReviewWrite from '~/components/bottomSheet/reaturantDetail/ReviewWrite';
import { Review } from '~/types/restaurants';

interface ReviewsProps {
	reviews: Review[];
	restaurentId: number;
	refetch: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({
	reviews,
	restaurentId,
	refetch,
}) => {
	return (
		<>
			<Title>한줄평</Title>
			{reviews &&
				reviews.map((review) => (
					<ReviewContent
						key={review.id}
						restaurentId={restaurentId}
						review={review}
						refetch={refetch}
					/>
				))}
			<ReviewWrite restaurentId={restaurentId} />
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
