import styled from 'styled-components';
import FriendsIcon from '~/assets/icons/FriendsIcon';
import HomeIcon from '~/assets/icons/HomeIcon';
import MyListIcon from '~/assets/icons/MyListIcon';
import ProfileIcon from '~/components/navBar/ProfileIcon';
import NavItemWrapper from '~/components/navBar/NavItemWrapper';
import { useLocation } from 'react-router-dom';

const Nav = styled.nav`
	height: 56px;
	padding: 4px;
	position: sticky;
	bottom: 0;
	z-index: 100;

	background-color: ${({ theme }) => theme.colors.white};

	filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
`;

const NavList = styled.ul`
	list-style-type: none;
	height: 100%;
	display: flex;

	justify-content: space-around;
	align-items: center;
	margin: 0;
	padding: 0;
`;

const navItems = [
	{ path: '/', label: 'Home', Icon: HomeIcon },
	{ path: '/myList', label: 'My List', Icon: MyListIcon },
	{ path: '/friends', label: 'Friends', Icon: FriendsIcon },
	{ path: '/profile', label: 'Profile', Icon: ProfileIcon },
];

const NavBar = () => {
	const { pathname } = useLocation();

	return (
		<Nav>
			<NavList>
				{navItems.map(({ path, label, Icon }) => (
					<NavItemWrapper key={path} $isActive={pathname === path} link={path}>
						<Icon />
						{label}
					</NavItemWrapper>
				))}
			</NavList>
		</Nav>
	);
};

export default NavBar;
