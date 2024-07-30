import { useState } from 'react';
import { styled } from 'styled-components';
import QuestionIcon from '~/assets/icons/QuestionIcon';
import XIcon from '~/assets/icons/XIcon';

// TODO: SearchBar에 focus가 가면 search 페이지로 넘어가게 하고 싶어요.
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
			<QuestionIcon />
			<Input type="text" value={searchText} onChange={handleInputChange} />
			{searchText && (
				<ClearButton onClick={clearInput}>
					<XIcon />
				</ClearButton>
			)}
		</SearchContainer>
	);
};

export default SearchBar;
