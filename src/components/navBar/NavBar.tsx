import styled from 'styled-components';
import FriendsIcon from '~/assets/icons/FriendsIcon';
import HomeIcon from '~/assets/icons/HomeIcon';
import MyListIcon from '~/assets/icons/MyListIcon';
import ProfileIcon from '~/components/navBar/ProfileIcon';
import NavItemWrapper from '~/components/navBar/NavItemWrapper';
import defaultTheme from '~/styles/theme';

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

// TODO: NavBar에 들어갈 링크를 추가해야해요.
const NavBar = () => {
	return (
		<Nav>
			<NavList>
				<NavItemWrapper link="/">
					<HomeIcon color={defaultTheme.colors.gray} />
					Home
				</NavItemWrapper>
				<NavItemWrapper link="/">
					<MyListIcon color={defaultTheme.colors.gray} />
					MyList
				</NavItemWrapper>
				<NavItemWrapper link="/">
					<FriendsIcon color={defaultTheme.colors.gray} />
					Friends
				</NavItemWrapper>
				<NavItemWrapper link="/">
					<ProfileIcon />
					Profile
				</NavItemWrapper>
			</NavList>
		</Nav>
	);
};

export default NavBar;
