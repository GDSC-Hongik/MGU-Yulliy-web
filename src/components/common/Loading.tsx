import { styled } from 'styled-components';
import spinnerImg from '~/assets/images/spinner.gif';

const Overlay = styled.div`
	z-index: 200;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 400px;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;

	background-color: ${({ theme }) => theme.colors.white};
`;

const Loading = () => {
	return (
		<Overlay>
			<img src={spinnerImg} alt="loading" width={150} />
			<h3>잠시만 기다려주세요.</h3>
		</Overlay>
	);
};

export default Loading;
