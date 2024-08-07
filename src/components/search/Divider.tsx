import { styled } from 'styled-components';

export const Divider = styled.div`
	width: 100%;
	margin: 16px 0;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.whitegray};
`;
