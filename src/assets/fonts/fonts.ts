export enum fontWeights {
	Light = 300,
	Normal = 'normal',
	Bold = 'bold',
	ExtraBold = 800,
}

const fonts = `
	@font-face {
			font-family: 'NanumSquareRound';
			src: url('/fonts/NanumSquareRoundB.woff2') format('woff2');
			font-weight: ${fontWeights.Bold};
			font-style: normal;
			font-display: swap;
	}

	@font-face {
			font-family: 'NanumSquareRound';
			src: url('/fonts/NanumSquareRoundEB.woff2') format('woff2');
			font-weight: ${fontWeights.ExtraBold};
			font-style: normal;
			font-display: swap;
	}

	@font-face {
			font-family: 'NanumSquareRound';
			src: url('/fonts/NanumSquareRoundL.woff2') format('woff2');
			font-weight: ${fontWeights.Light};
			font-style: normal;
			font-display: swap;
	}

	@font-face {
			font-family: 'NanumSquareRound';
			src: url('/fonts/NanumSquareRoundR.woff2') format('woff2');
			font-weight: ${fontWeights.Normal};
			font-style: normal;
			font-display: swap;
	}
`;

export default fonts;
