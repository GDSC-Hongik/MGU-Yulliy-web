import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/MGU.svg';
import axios from '../libs/axios';

interface DescriptionProps {
	small?: boolean;
}
const Form = styled.form`
	margin-left: 20px;
`;

const Img = styled.img`
	box-sizing: border-box;
	width: 208px;
	height: 90px;
	margin: 100px 90px 0px;
`;

const Description = styled.div<DescriptionProps>`
	margin: 14px;
	margin-top: ${({ small }) => (small ? '50px' : '0px')};
	font-size: ${({ small }) => (small ? '16px' : '24px')};
	color: #848187;
	text-align: center;
`;
const Container = styled.div`
	width: 390px;
	height: 844px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: auto;
`;

function SignupPage() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		passwordRepeat: '',
	});
	function handleChange(e: any) {
		const { name, value } = e.target;

		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		const { name, email, password, passwordRepeat } = values;
		if (!name || !email || !password) {
			alert('필수 정보를 입력해주시길 바랍니다!');
			return;
		}
		if (password !== passwordRepeat) {
			alert('비밀번호가 일치하지 않습니다!');
			return;
		}

		try {
			await axios.post('/users', {
				name,
				email,
				password,
			});
			alert('회원 가입이 성공적으로 되었습니다!');
			navigate('/login');
		} catch (error) {
			const error1 = error as any;
			if (error1.response) {
				if (error1.response.status === 409) {
					console.error('Conflict: 중복된 데이터가 존재합니다.');
					alert('이미 사용 중인 이메일이나 사용자 이름입니다.');
				} else {
					console.error('서버 오류:', error1.response.data);
					alert('서버 오류!');
				}
			} else {
				console.error('네트워크 오류:', error1.message);
				alert('네트워크 오류!');
			}
		}
	}

	return (
		<Container>
			<Img src={logo} alt="logo" />
			<Description>회원가입</Description>
			<Form onSubmit={handleSubmit}>
				<Input
					type="text"
					id="name"
					name="name"
					placeholder="별명"
					value={values.name}
					onChange={handleChange}
				/>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="이메일"
					value={values.email}
					onChange={handleChange}
				/>
				<Input
					type="password"
					id="password"
					name="password"
					placeholder="비밀번호"
					value={values.password}
					onChange={handleChange}
				/>
				<Input
					type="password"
					id="passwordRepeat"
					name="passwordRepeat"
					placeholder="비밀번호 확인"
					value={values.passwordRepeat}
					onChange={handleChange}
				/>
				<Button type="submit">MustGoYour맛집 회원가입</Button>
				<Description small>
					이미 회원이신가요? <Link to="/"> 로그인 하기</Link>
				</Description>
			</Form>
		</Container>
	);
}

export default SignupPage;
