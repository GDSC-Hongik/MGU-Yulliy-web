// 임시로 만들어본 폰트 테스트 페이지입니다.
import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import axios from '../libs/axios';
import { useNavigate } from 'react-router-dom';
interface TestDivProps {
	fontWeight: 'regular' | 'bold' | 'extraBold' | 'light';
}

const HomePage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		async function checkUser() {
			try {
				const res = await axios.get('/users/me');
				if (res.data) {
					navigate('/');
				}
			} catch (error) {
				navigate('/login');
			}
		}
		checkUser();
	}, []);
	return (
		<Container>
			<h1>Regular(400), Bold(700), Extra Bold(800), Light(300) 지원됩니다.</h1>
			<br />
			<TestDiv fontWeight="regular">폰트 테스트 1 : regular(400)</TestDiv>
			<TestDiv fontWeight="bold">폰트 테스트 2 : bold(700)</TestDiv>
			<TestDiv fontWeight="extraBold">폰트 테스트 3 : Extra Bold(800)</TestDiv>
			<TestDiv fontWeight="light">폰트 테스트 4 :Light(300)</TestDiv>
		</Container>
	);
};

export default HomePage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const TestDiv = styled.div<TestDivProps>`
	${({ fontWeight }) => fontWeightCSS(fontWeight)}
`;

// 폰트 가중치 스타일 정의
const fontWeightCSS = (fontWeight: TestDivProps['fontWeight']) => css`
	font-weight: ${getFontWeight(fontWeight)};
`;

const getFontWeight = (weight: TestDivProps['fontWeight']) => {
	switch (weight) {
		case 'bold':
			return '700';
		case 'regular':
			return '400';
		case 'light':
			return '300';
		case 'extraBold':
			return '800';
		default:
			return '400';
	}
};
