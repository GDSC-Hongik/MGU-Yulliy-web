import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import NavBackIcon from '~/assets/icons/NavBackIcon';
import QuestionIcon from '~/assets/icons/QuestionIcon';
import XIcon from '~/assets/icons/XIcon';
import SearchContents from '~/components/map/SearchContents';
import usePostSearch from '~/hooks/api/search/usePostSearch';
import { searchRestaurantAtom } from '~/store/restaurants';

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

const SubmitButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	padding: 5px 10px;
	border-radius: 5px;
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
	const location = useLocation();
	const [searchText, setSearchText] = useState<string>('');
	const [isOverlayVisible, setOverlayVisible] = useState<boolean>(
		location.pathname === '/search',
	);
	const setSearchRestaurants = useSetAtom(searchRestaurantAtom);

	const { data, refetch } = usePostSearch({ query: searchText });
	useEffect(() => {
		if (data) {
			setSearchRestaurants(data.results);
		}
	}, [data, setSearchRestaurants]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		if (e.target.value === '') {
			clearInput();
		}
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
		setSearchRestaurants([]);
	};

	// form 태그에서 나오는 e 값 타입 넣기
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// searchText가 비어 있는 경우 refetch를 하지 않음
		if (searchText.trim() !== '') {
			console.log('Submit button clicked');
			refetch();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
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
				{/* TODO: 임시 submit 버튼이라 나중에 바꿔야함 */}
				<SubmitButton type="submit">Search</SubmitButton>
			</SearchContainer>
			<SearchContents $isVisible={isOverlayVisible} />
		</form>
	);
};

export default SearchBar;
