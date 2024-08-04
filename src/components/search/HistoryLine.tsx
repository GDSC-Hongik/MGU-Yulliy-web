import { styled } from 'styled-components';
import XIcon from '~/assets/icons/XIcon';
import { History } from '~/types/search';

const LineWarpper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DelButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
	margin-right: 3px;
`;

const HistoryLine: React.FC<History> = ({ id, query }) => {
	const handleDelButton = () => {
		console.log(`${id} 삭제`);
	};

	return (
		<LineWarpper>
			{query}
			{id}
			<DelButton onClick={handleDelButton}>
				<XIcon />
			</DelButton>
		</LineWarpper>
	);
};

export default HistoryLine;
