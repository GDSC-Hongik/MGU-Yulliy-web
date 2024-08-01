import styled from 'styled-components';
import useDraggable from '~/hooks/useDraggable';

type BottomSheetProps = {
	onClose: () => void;
};

const BottomSheetWrapper = styled.div<{ translatey: number }>`
	position: fixed;
	bottom: 0;
	z-index: 100;
	width: 400px;
	background-color: ${({ theme }) => theme.colors.white};
	filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));

	border-top-left-radius: 16px;
	border-top-right-radius: 16px;

	max-height: 80vh;

	overflow-y: auto;
	transform: translateY(${({ translatey: translateY }) => translateY}px);
`;

const Handle = styled.div`
	width: 50px;
	height: 5px;
	background-color: ${({ theme }) => theme.colors.gray};
	border-radius: 5px;
	margin: 10px auto;
	cursor: grab;
`;

const BottomSheetContent = styled.div`
	padding: 16px;
	// TODO: 임시 크기
	height: 1000px;
`;

const CloseButton = styled.button`
	cursor: pointer;
`;

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose }) => {
	const { translateY, handleMouseDown } = useDraggable(onClose);

	return (
		<BottomSheetWrapper translatey={translateY}>
			<Handle onMouseDown={handleMouseDown} />
			<BottomSheetContent>
				<h2>바텀 시트</h2>
				<p>내용</p>
				<CloseButton onClick={onClose}>닫기</CloseButton>
			</BottomSheetContent>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
