import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import HistoryLine from '~/components/search/HistoryLine';
import useGetSearch from '~/hooks/api/search/useGetSearch';
import { History } from '~/types/search';

type SearchContentsProps = {
	isVisible: boolean;
};

const Overlay = styled.div<{ isVisible: boolean }>`
	z-index: 99;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 400px;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const HistoryWrapper = styled.ul`
	margin-top: 100px;
	padding: 20px;
	overflow-y: auto;
	height: 75%;

	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 12px;
`;

const SearchContents: React.FC<SearchContentsProps> = ({ isVisible }) => {
	const [histories, setHistories] = useState<History[]>([]);
	const { data } = useGetSearch();
	useEffect(() => {
		if (data) {
			setHistories(data.histories);
		}
	}, [data, setHistories]);

	return (
		<Overlay isVisible={isVisible}>
			<HistoryWrapper>
				{histories.length === 0 ? (
					<div>검색 기록이 없습니다.</div>
				) : (
					<>
						{histories.map((history) => (
							<HistoryLine key={history.id} {...history} />
						))}
					</>
				)}
			</HistoryWrapper>
		</Overlay>
	);
};

export default SearchContents;
