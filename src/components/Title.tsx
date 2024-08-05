import styled from 'styled-components';

type TitleProps = {
	main?: boolean;
};

const Title = styled.p<TitleProps>`
	font-size: ${({ main }) => (main ? '28px' : '20px')};
	text-align: ${({ main }) => (main ? 'center' : 'left')};
	box-sizing: border-box;
	width: 100%;
	margin: 5px;
	height: ${({ main }) => (main ? '28px' : '20px')};
`;

export default Title;
