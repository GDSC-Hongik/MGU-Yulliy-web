import { styled } from 'styled-components';
import { Review } from '~/types/restaurants';

interface ReviewContentProps {
	review: Review;
}

const formatDate = (date: string) => {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
};

const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
	console.log(review);
	return (
		<ReviewBox>
			<div>
				<ContentText>{review.content}</ContentText>
				<SubText>
					{review.user_name} / {formatDate(review.date)}
				</SubText>
				<LookReply>답글 보기 ({review.replies_count})</LookReply>
			</div>
			<div>
				<div>
					GOOD
					{review.recommend_count}
				</div>
				<div>
					BAD
					{review.decommend_count}
				</div>
			</div>
		</ReviewBox>
	);
};

export default ReviewContent;

const ReviewBox = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 8px;
	margin-top: 8px;
	padding: 16px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.whitegray};
`;

const ContentText = styled.div`
	color: ${({ theme }) => theme.colors.gray};
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
`;

const SubText = styled.div`
	color: ${({ theme }) => theme.colors.gray};
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
`;

const LookReply = styled.button`
	display: inline-block;
	margin-top: 8px;
	font-size: 12px;
	font-weight: ${({ theme }) => theme.fontWeights.Light};
	color: ${({ theme }) => theme.colors.gray};
	background-color: transparent;
	border: none;
	cursor: pointer;
`;
