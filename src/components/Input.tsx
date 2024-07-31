import styled from 'styled-components';
import theme from '../styles/theme';

type InputProps = {
	error?: boolean;
};

const Input = styled.input<InputProps>`
	box-sizing: border-box;
	background-color: ${theme.colors.whitegray};
	border: none;
	border-radius: 50px;
	color: ${theme.colors.black};
	cursor: pointer;
	font-size: 16px;
	padding: 5px;
	padding-left: 20px;
	margin-top: 5px;
	margin-bottom: 5px;
	width: 350px;
	height: 50px;

	outline: none;
	${({ error }) =>
		!error &&
		`
    &:focus {
      border: 2px solid ${theme.colors.orange};
    }
`}

	&::placeholder {
		color: ${theme.colors.gray};
	}
`;

export default Input;
