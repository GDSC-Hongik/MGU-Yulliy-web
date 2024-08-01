import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

type BottomSheetProps = {
	onClose: () => void;
};

const calculateInitialTranslateY = () => {
	const vh = window.innerHeight;
	const initialHeight = 400;
	return vh - initialHeight;
};

const BottomSheetWrapper = styled.div<{ translateY: number }>`
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
	transform: translateY(${({ translateY }) => translateY}px);
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
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);
	const [translateY, setTranslateY] = useState(calculateInitialTranslateY());

	const handleMouseDown = (event: React.MouseEvent) => {
		setIsDragging(true);
		setStartY(event.clientY);
	};

	// 드래그 진행 중
	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isDragging) return;
			const offsetY = event.clientY - startY;
			setTranslateY((prev) => Math.max(0, prev + offsetY));
			setStartY(event.clientY);
		},
		[isDragging, startY],
	);

	// 드래그 종료
	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
		if (window.innerHeight - startY < 70) {
			onClose();
		}
	}, [startY, onClose]);

	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, handleMouseMove, handleMouseUp]);

	return (
		<BottomSheetWrapper translateY={translateY}>
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
