import styled from 'styled-components';

const Input = styled.input`
	box-sizing: border-box;
	background-color: #f0f0f3;
	border: none;
	border-radius: 50px;
	color: #111111;
	cursor: pointer;
	font-size: 16px;
	padding: 5px;
	padding-left: 20px;
	margin-top: 5px;
	margin-bottom: 5px;
	width: 350px;
	height: 50px;

	outline: none;
	${({ error }: any) =>
		!error &&
		`
    &:focus {
      border: 2px solid #FC6B02;
    }
`}

	&::placeholder {
		color: #c4c5cd;
	}
`;

export default Input;
