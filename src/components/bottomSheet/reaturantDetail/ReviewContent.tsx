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

const countFormat = (count: number) => {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count;
};

const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
	return (
		<ReviewBox>
			<div>
				<ContentText>{review.content}</ContentText>
				<SubText>
					{review.user_name} / {formatDate(review.date)}
				</SubText>
				<LookReply>답글 보기 ({review.replies_count})</LookReply>
			</div>
			<RecommendBox>
				<Recommend>
					<div>GOOD</div>
					<div>{countFormat(review.recommend_count)}</div>
				</Recommend>
				<Decommend>
					<div>BAD</div>
					<div>{countFormat(review.decommend_count)}</div>
				</Decommend>
			</RecommendBox>
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

const RecommendBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 4px 0;
`;

const Recommend = styled.button`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	color: ${({ theme }) => theme.colors.orange};
	border: none;
	cursor: pointer;
`;

const Decommend = styled.button`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	color: ${({ theme }) => theme.colors.gray};
	border: none;
	cursor: pointer;
`;
