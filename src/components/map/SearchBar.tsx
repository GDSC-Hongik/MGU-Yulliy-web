import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import NavBackIcon from '~/assets/icons/NavBackIcon';
import QuestionIcon from '~/assets/icons/QuestionIcon';
import XIcon from '~/assets/icons/XIcon';
import SearchContents from '~/components/map/SearchContents';

type SearchBarProps = {
	bottomSheetClose: () => void;
};

const SearchContainer = styled.div`
	z-index: 100;
	position: fixed;
	left: 50%;
	transform: translate(-50%, 0);
	top: 20px;

	width: 350px;
	height: 50px;
	padding: 13px;

	display: flex;
	align-items: center;

	border-radius: 999px;
	background-color: ${({ theme }) => theme.colors.white};
	filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
`;

const ClearButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
	margin-right: 3px;
`;

const Input = styled.input`
	margin: 0 13px;
	width: 200px;
	flex: 1;
	border: none;

	&:focus {
		width: 250px;
		outline: none;
	}
`;
const NavBackButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
`;

const SearchBar: React.FC<SearchBarProps> = ({ bottomSheetClose }) => {
	const [searchText, setSearchText] = useState<string>('');
	const location = useLocation();
	const [isOverlayVisible, setOverlayVisible] = useState<boolean>(
		location.pathname === '/search',
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const handleBackButtonClick = () => {
		setOverlayVisible(false);
		window.history.pushState(null, '', '/');
	};

	const handeInputFocus = () => {
		bottomSheetClose();
		window.history.pushState(null, '', '/search');
		setOverlayVisible(true);
	};

	const clearInput = () => {
		setSearchText('');
	};

	return (
		<>
			<SearchContainer>
				{isOverlayVisible ? (
					<NavBackButton onClick={handleBackButtonClick}>
						<NavBackIcon />
					</NavBackButton>
				) : (
					<QuestionIcon />
				)}
				<Input
					type="text"
					value={searchText}
					onChange={handleInputChange}
					onFocus={handeInputFocus}
				/>
				{searchText && (
					<ClearButton onClick={clearInput}>
						<XIcon />
					</ClearButton>
				)}
			</SearchContainer>
			<SearchContents isVisible={isOverlayVisible} />
		</>
	);
};

export default SearchBar;
