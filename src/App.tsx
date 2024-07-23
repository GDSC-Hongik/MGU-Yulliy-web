import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

export const App = () => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<DefaultLayout>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</BrowserRouter>
			</DefaultLayout>
		</ThemeProvider>
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
