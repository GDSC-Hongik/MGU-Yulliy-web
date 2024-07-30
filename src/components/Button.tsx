import styled from 'styled-components';
import theme from '../styles/theme';

const Button = styled.button`
	box-sizing: border-box;
	background-color: ${theme.colors.orange};
	border: none;
	border-radius: 50px;
	color: ${theme.colors.black};
	cursor: pointer;
	font-size: 16px;
	padding: 5px;
	padding-left: 16px;
	margin-top: 15px;
	width: 350px;
	height: 50px;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;

export default Button;
