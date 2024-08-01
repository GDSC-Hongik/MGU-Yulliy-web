import styled from 'styled-components';

type BottomSheetProps = {
	onClose: () => void;
};

const BottomSheetWrapper = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: white;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	max-height: 50vh;
	overflow-y: auto;
	transition: transform 0.3s ease-in-out;
	transform: translateY(0);
`;

const BottomSheetContent = styled.div`
	padding: 16px;
`;

const CloseButton = styled.button`
	cursor: pointer;
`;

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose }) => {
	return (
		<BottomSheetWrapper>
			<BottomSheetContent>
				<h2>바텀 시트</h2>
				<CloseButton onClick={onClose}>닫기</CloseButton>
			</BottomSheetContent>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
