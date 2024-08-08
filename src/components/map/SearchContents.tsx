import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import HistoryLine from '~/components/search/HistoryLine';
import useGetSearch from '~/hooks/api/search/useGetSearch';
import { History } from '~/types/search';
import { useAtom } from 'jotai';
import SearchResultLine from '~/components/search/SearchResultLine';
import { searchRestaurantAtom } from '~/store/restaurants';

type SearchContentsProps = {
	$isVisible: boolean;
	textSetter: (text: string) => void;
};

const Overlay = styled.div<{ $isVisible: boolean }>`
	z-index: 99;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 400px;
	height: calc(100% - 56px);
	background-color: ${({ theme }) => theme.colors.whitegray};
	display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;

const HistoryWrapper = styled.ul`
	margin-top: 100px;
	padding: 40px 0;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 12px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	background-color: ${({ theme }) => theme.colors.white};
`;

const OverflowBox = styled.div`
	width: 100%;
	padding-bottom: 56px;
	overflow-y: auto;
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;

const EmptyHistory = styled.div`
	padding: 20px;
	text-align: center;
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
`;

const SearchContents: React.FC<SearchContentsProps> = ({
	$isVisible,
	textSetter,
}) => {
	const [histories, setHistories] = useState<History[]>([]);
	const [searchRestaurants] = useAtom(searchRestaurantAtom);
	const { data } = useGetSearch();
	useEffect(() => {
		if (data) {
			setHistories(data);
		}
	}, [data, setHistories]);

	const removeHistory = (id: number) => {
		setHistories(histories.filter((history) => history.id !== id));
	};

	return (
		<Overlay $isVisible={$isVisible}>
			<HistoryWrapper>
				<OverflowBox>
					{searchRestaurants.length > 0 ? (
						searchRestaurants.map((result) => (
							<SearchResultLine key={result.id} {...result} />
						))
					) : histories.length > 0 ? (
						// restaurant가 비어있고 histories가 있으면 이 컴포넌트를 보여줍니다.
						<>
							{histories.map((history) => (
								<HistoryLine
									key={history.id}
									setFn={() => {
										textSetter(history.query);
									}}
									removeHistory={removeHistory}
									{...history}
								/>
							))}
						</>
					) : (
						// 둘 다 없으면 이 메시지를 보여줍니다.
						<EmptyHistory>검색 기록이 없습니다.</EmptyHistory>
					)}
				</OverflowBox>
			</HistoryWrapper>
		</Overlay>
	);
};

export default SearchContents;
