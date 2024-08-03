import { Helmet } from 'react-helmet';

type HeadProps = {
	title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
	return (
		<Helmet>
			<title>{title} - MuGoU</title>
			<link rel="icon" href="/path/to/common-favicon.ico" />
			{/* ICO 파비콘 설정 */}
			<link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
			<link
				rel="icon"
				href="/favicon-16x16.ico"
				sizes="16x16"
				type="image/x-icon"
			/>
			<link
				rel="icon"
				href="/favicon-32x32.ico"
				sizes="32x32"
				type="image/x-icon"
			/>

			{/* Apple 터치 아이콘 설정 */}
			<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

			{/* Android 크롬 아이콘 설정 */}
			<link
				rel="icon"
				href="/android-chrome-512x512.png"
				sizes="512x512"
				type="image/png"
			/>
			<link
				rel="icon"
				href="/android-chrome-256x256.png"
				sizes="256x256"
				type="image/png"
			/>

			{/* 웹 매니페스트 설정 */}
			<link rel="manifest" href="/site.webmanifest" />
		</Helmet>
	);
};

export default Head;
