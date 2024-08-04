import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error('ErrorBoundary caught an error', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>알 수 없는 에러가 발생했어요.</h1>;
		}

		// 자식 컴포넌트 렌더링
		return this.props.children;
	}
}

export default ErrorBoundary;
