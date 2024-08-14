import { styled } from 'styled-components';
import usePostRecommend from '~/hooks/api/restaurants/usePostRecommend';
import { Review } from '~/types/restaurants';

interface ReviewContentProps {
	review: Review;
	restaurentId: number;
	refetch: () => void;
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

const ReviewContent: React.FC<ReviewContentProps> = ({
	review,
	restaurentId,
	refetch,
}) => {
	const mutation = usePostRecommend(restaurentId, review.id);

	const recommendClick = () => {
		mutation.mutate(
			{ evaluation: 1 },
			{
				onSuccess: () => {
					alert('좋아요를 반영했습니다.');
					refetch();
				},
				onError: (error) => {
					console.error('좋아요 반영에 실패했습니다.', error);
				},
			},
		);
	};

	const decommendClick = () => {
		mutation.mutate(
			{ evaluation: 0 },
			{
				onSuccess: () => {
					alert('싫어요를 반영했습니다.');
					refetch();
				},
				onError: (error) => {
					console.error('싫어요 반영에 실패했습니다.', error);
				},
			},
		);
	};

	return (
		<ReviewBox>
			<div>
				<ContentText>{review.content}</ContentText>
				<SubText>
					{review.user_name} / {formatDate(review.date)}
				</SubText>
				{/* 답글보기 기능은 아직 다른 기능을 구현하는데 집중하고 있어서 구현하지 않았습니다. */}
				{/* <LookReply>답글 보기 ({review.replies_count})</LookReply> */}
			</div>
			<RecommendBox>
				<Recommend onClick={recommendClick}>
					<div>GOOD</div>
					<div>{countFormat(review.recommend_count)}</div>
				</Recommend>
				<Decommend onClick={decommendClick}>
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

// const LookReply = styled.button`
// 	display: inline-block;
// 	margin-top: 8px;
// 	font-size: 12px;
// 	font-weight: ${({ theme }) => theme.fontWeights.Light};
// 	color: ${({ theme }) => theme.colors.gray};
// 	background-color: transparent;
// 	border: none;
// 	cursor: pointer;
// `;

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
