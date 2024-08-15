import styled from 'styled-components';
import theme from '../styles/theme';

interface SmallButtonProps {
	decline?: boolean;
}

const SmallButton = styled.button<SmallButtonProps>`
	background-color: ${({ decline }) =>
		decline ? theme.colors.gray : theme.colors.orange};
	color: ${theme.colors.white};
	box-sizing: border-box;
	width: 50px;
	height: 20px;
	font-size: 10px;
	border-radius: 8px;
	border: none;
	margin-top: 2px;
	margin-right: 10px;
	&:hover,
	&:active {
		background-color: ${theme.colors.grayorange};
		color: ${theme.colors.white};
	}
`;

export default SmallButton;
