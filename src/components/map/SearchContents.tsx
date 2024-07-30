import { styled } from 'styled-components';

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

const SearchContents: React.FC<SearchContentsProps> = ({ isVisible }) => {
	return <Overlay isVisible={isVisible}>SearchContents</Overlay>;
};

export default SearchContents;
