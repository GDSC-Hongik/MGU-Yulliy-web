import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const NavItem = styled.li`
	display: inline;
`;

const NavLink = styled(Link)`
	color: ${({ theme }) => theme.colors.gray};
	text-decoration: none;
	font-size: 12px;
	font-weight: 500;
	background-color: orenge;
	&:hover {
		text-decoration: none;
	}

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	gap: 4px;

	&:hover,
	&:focus {
		color: ${({ theme }) => theme.colors.black};

		& > svg > path {
			stroke: ${({ theme }) => theme.colors.black};
			stroke-width: 1.7;
		}

		& > div {
			border: 1.7px solid ${({ theme }) => theme.colors.black};
		}
	}
`;

type NavItemWrapperProps = {
	link: string;
	children: React.ReactNode;
};

const NavItemWrapper = ({ link, children }: NavItemWrapperProps) => {
	return (
		<NavItem>
			<NavLink to={link}>{children}</NavLink>
		</NavItem>
	);
};

export default NavItemWrapper;
