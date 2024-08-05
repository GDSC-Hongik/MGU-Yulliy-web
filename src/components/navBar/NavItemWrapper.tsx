import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const NavItem = styled.li`
	display: inline;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
	color: ${({ theme, $isActive }) =>
		$isActive ? theme.colors.black : theme.colors.gray};
	text-decoration: none;
	font-size: 12px;
	font-weight: 500;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 4px;

	& > svg > path {
		stroke: ${({ theme, $isActive }) =>
			$isActive ? theme.colors.black : theme.colors.gray};
		stroke-width: 1.5;
	}

	& > div {
		outline: 1px solid
			${({ theme, $isActive }) =>
				$isActive ? theme.colors.black : theme.colors.gray};
	}

	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.black};

		& > svg > path {
			stroke: ${({ theme }) => theme.colors.black};
			stroke-width: 1.7;
		}

		& > div {
			outline: 1.7px solid ${({ theme }) => theme.colors.black};
		}
	}
`;

type NavItemWrapperProps = {
	link: string;
	$isActive: boolean;
	children: React.ReactNode;
};

const NavItemWrapper: React.FC<NavItemWrapperProps> = ({
	link,
	$isActive,
	children,
}) => {
	return (
		<NavItem>
			<NavLink to={link} $isActive={$isActive}>
				{children}
			</NavLink>
		</NavItem>
	);
};

export default NavItemWrapper;
