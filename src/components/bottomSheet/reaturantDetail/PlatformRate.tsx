import { styled } from 'styled-components';

interface PlatformRateProps {
	platform: string;
	rating: number | string | null;
}

export const PlatformRate: React.FC<PlatformRateProps> = ({
	platform,
	rating,
}) => {
	if (typeof rating === 'string') {
		rating = parseFloat(rating);
	}
	const score = rating ? rating : 0;
	return (
		<Wrapper>
			<PlatformName>{platform}</PlatformName>
			<ColDevider />
			<ScoreText>{score.toFixed(1)}</ScoreText>
			<BackgroundBar>
				<FilledBar filledPercentage={(score / 5) * 100} />
			</BackgroundBar>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const PlatformName = styled.div`
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
	width: 40px;
	text-align: center;
	flex-shrink: 0;
`;

const ColDevider = styled.div`
	width: 1px;
	height: 12px;
	background-color: ${({ theme }) => theme.colors.whitegray};
`;

const ScoreText = styled.div`
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
	flex-shrink: 0;
`;

const BackgroundBar = styled.div`
	display: flex;
	width: 100%;
	height: 3px;
	background-color: ${({ theme }) => theme.colors.whitegray};
	border-radius: 3px;
`;

const FilledBar = styled.div<{ filledPercentage: number }>`
	width: ${({ filledPercentage }) => filledPercentage}%;
	background-color: ${({ theme }) => theme.colors.orange};
	border-radius: 3px;
`;
