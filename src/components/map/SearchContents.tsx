import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import HistoryLine from '~/components/search/HistoryLine';
import useGetSearch from '~/hooks/api/search/useGetSearch';
import { History } from '~/types/search';
import { tempRestaurantAtom } from '../../store/restaurants';
import { useAtom } from 'jotai';
import SearchResultLine from '~/components/search/SearchResultLine';

type SearchContentsProps = {
	$isVisible: boolean;
};

const Overlay = styled.div<{ $isVisible: boolean }>`
	z-index: 99;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 400px;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
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

const SearchContents: React.FC<SearchContentsProps> = ({ $isVisible }) => {
	const [histories, setHistories] = useState<History[]>([]);
	const [tempRestaurant] = useAtom(tempRestaurantAtom);
	const { data } = useGetSearch();
	useEffect(() => {
		if (data) {
			setHistories(data.histories);
		}
	}, [data, setHistories]);

	const removeHistory = (id: number) => {
		setHistories(histories.filter((history) => history.id !== id));
	};

	return (
		<Overlay $isVisible={$isVisible}>
			<HistoryWrapper>
				{tempRestaurant.results.length > 0 ? (
					tempRestaurant.results.map((result) => (
						<SearchResultLine key={result.id} {...result} />
					))
				) : histories.length > 0 ? (
					// tempRestaurant가 비어있고 histories가 있으면 이 컴포넌트를 보여줍니다.
					<>
						{histories.map((history) => (
							<HistoryLine
								key={history.id}
								removeHistory={removeHistory}
								{...history}
							/>
						))}
					</>
				) : (
					// 둘 다 없으면 이 메시지를 보여줍니다.
					<div>검색 기록이 없습니다.</div>
				)}
			</HistoryWrapper>
		</Overlay>
	);
};

export default SearchContents;
