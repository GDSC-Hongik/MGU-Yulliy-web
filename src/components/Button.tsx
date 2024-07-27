import styled from 'styled-components';

const Button = styled.button`
	box-sizing: border-box;
	background-color: #fc6b02;
	border: none;
	border-radius: 50px;
	color: #111111;
	cursor: pointer;
	font-size: 16px;
	padding: 5px;
	padding-left: 16px;
	margin-top: 15px;
	width: 350px;
	height: 50px;
	&:hover,
	&:active {
		background-color: #ffc397;
		color: #c4c5cd;
	}
`;

export default Button;
