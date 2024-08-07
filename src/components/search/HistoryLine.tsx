import { styled } from 'styled-components';
import XIcon from '~/assets/icons/XIcon';
import { Divider } from '~/components/search/Divider';
import useDelSearch from '~/hooks/api/search/useDelSearch';

type HistoryLineProps = {
	setFn: () => void;
	id: number;
	removeHistory: (id: number) => void;
	query: string;
};

const LineWarpper = styled.div`
	width: 100%;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;

const HistoryButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;

	flex: 1;
	text-align: left;
`;

const Query = styled.h3`
	display: inline-block;
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontWeights.Regular};
	max-width: 100%;
`;

const DelButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
	margin-right: 3px;
`;

const HistoryLine: React.FC<HistoryLineProps> = ({
	setFn,
	id,
	removeHistory,
	query,
}) => {
	const { mutate: deleteSearch } = useDelSearch();

	const handleHistoryButton = () => {
		setFn();
	};

	const handleDelButton = () => {
		deleteSearch({ id });
		removeHistory(id);
	};

	return (
		<>
			<LineWarpper>
				<HistoryButton onClick={handleHistoryButton}>
					<Query>{query}</Query>
				</HistoryButton>
				<DelButton onClick={handleDelButton}>
					<XIcon />
				</DelButton>
			</LineWarpper>
			<Divider />
		</>
	);
};

export default HistoryLine;
