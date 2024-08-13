import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import WriteIcon from '~/assets/icons/WriteIcon';
import usePostReview from '~/hooks/api/restaurants/usePostReview';

interface ReviewWriteProps {
	restaurentId: number;
}

const ReviewWrite: React.FC<ReviewWriteProps> = ({ restaurentId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState('');
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { refetch } = usePostReview(restaurentId, { content });

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 300);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = () => {
		if (!content) {
			return;
		}
		refetch();
		setContent('');
		setIsOpen(false);
	};

	return (
		<WriteButton $isOpen={isOpen} onClick={toggleOpen} ref={containerRef}>
			{isOpen ? (
				<InputContainer $isOpen={isOpen}>
					<TextInput
						ref={inputRef}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="한줄평을 작성해주세요."
						onClick={(e) => e.stopPropagation()} // input 클릭 시 이벤트 전파 막기
					/>
					<SubmitButton onClick={handleSubmit}>
						<WriteIcon />
						SUBMIT
					</SubmitButton>
				</InputContainer>
			) : (
				<WriteStart>
					<WriteIcon />
					WRITE
				</WriteStart>
			)}
		</WriteButton>
	);
};

export default ReviewWrite;

const WriteButton = styled.div<{ $isOpen: boolean }>`
	z-index: 200;
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: ${({ $isOpen }) => ($isOpen ? '90%' : '60px')};
	height: ${({ $isOpen }) => ($isOpen ? '80px' : '60px')};
	border-radius: 6px;
	background-color: ${({ theme }) => theme.colors.white};

	color: ${({ $isOpen, theme }) =>
		$isOpen ? theme.colors.white : theme.colors.orange};
	font-size: ${({ $isOpen }) => ($isOpen ? '16px' : '18px')};
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	overflow: hidden;
	box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.form<{ $isOpen: boolean }>`
	display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
	align-items: center;
	gap: 8px;
	padding: 10px;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
`;

const TextInput = styled.input`
	width: 100%;
	padding: 10px;
	font-size: 14px;
	border: none;
	border-radius: 8px;
	outline: none;
`;

const SubmitButton = styled.button`
	width: 60px;
	height: 60px;
	padding: 4px;
	flex-shrink: 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	background-color: ${({ theme }) => theme.colors.orange};
	color: ${({ theme }) => theme.colors.white};
	svg > path {
		fill: ${({ theme }) => theme.colors.white};
	}
	font-size: 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
`;

const WriteStart = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;

	svg > path {
		fill: ${({ theme }) => theme.colors.orange};
	}

	font-size: 10px;
	font-weight: ${({ theme }) => theme.fontWeights.Bold};
`;
