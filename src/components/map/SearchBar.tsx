import { useState } from 'react';
import { styled } from 'styled-components';
import FriendsIcon from '~/assets/icons/FriendsIcon';

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
`;

// TODO: 임시로 이미 갖고있는 아이콘 꽂아넣음. 돋보기 아이콘 찾아넣기
const SearchIcon = styled(FriendsIcon)`
	width: 24px;
	height: 24px;
`;

const ClearButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: transparent;
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

const SearchBar = () => {
	const [searchText, setSearchText] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	const clearInput = () => {
		setSearchText('');
	};

	return (
		<SearchContainer>
			<SearchIcon />
			<Input type="text" value={searchText} onChange={handleInputChange} />
			{searchText && (
				<ClearButton onClick={clearInput}>
					{/* TODO: X 표시 아이콘으로 변경 */}
					<FriendsIcon />
				</ClearButton>
			)}
		</SearchContainer>
	);
};

export default SearchBar;
