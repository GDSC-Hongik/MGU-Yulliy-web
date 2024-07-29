// TODO: 임시로 이 이미지만 넣어봅시다. 나중애 바꿔야해요.
import styled from 'styled-components';
import ProfileImg from '~/assets/images/Profile.png';

const StyledProfileIcon = styled.div`
	background-image: url(${ProfileImg});
	width: 24px;
	height: 24px;
	background-size: cover; /* 이미지가 div를 덮도록 설정 */
	background-position: center; /* 이미지가 div의 중앙에 위치하도록 설정 */
	outline: 0px solid ${({ theme }) => theme.colors.gray};
	border-radius: 50%;
`;

const ProfileIcon = () => {
	return <StyledProfileIcon />;
};

export default ProfileIcon;
