import { useCallback, useEffect, useState } from 'react';

const calculateInitialTranslateY = () => {
	const vh = window.innerHeight;
	const initialHeight = 400;
	return vh - initialHeight;
};

const useDraggable = (onClose: () => void) => {
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);
	const [translateY, setTranslateY] = useState(calculateInitialTranslateY());

	const handleMouseDown = (event: React.MouseEvent) => {
		setIsDragging(true);
		setStartY(event.clientY);
	};

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isDragging) return;
			const offsetY = event.clientY - startY;
			setTranslateY((prev) => Math.max(0, prev + offsetY));
			setStartY(event.clientY);
		},
		[isDragging, startY],
	);

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

	return { translateY, handleMouseDown };
};

export default useDraggable;
