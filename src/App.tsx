import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { NavermapsProvider } from 'react-naver-maps';
import NavBar from './components/navBar/NavBar';

export const App = () => {
	const naverClientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

	return (
		<NavermapsProvider ncpClientId={naverClientId}>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyles />
				<DefaultLayout>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/search" element={<HomePage />} />
						</Routes>
						<NavBar />
					</BrowserRouter>
				</DefaultLayout>
			</ThemeProvider>
		</NavermapsProvider>
	);
};

export default App;

const DefaultLayout = styled.div`
	width: 100%;
	max-width: ${defaultTheme.size.maxWidth};
	min-height: 100dvh;
	margin: 0 auto;

	background-color: ${defaultTheme.colors.white};
`;
