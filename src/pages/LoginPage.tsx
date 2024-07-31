import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/MGU.icon.svg';
import axios from '../libs/axios';

const Form = styled.form`
	margin-left: 20px;
`;

const Img = styled.img`
	width: 158px;
	height: 278px;
	margin: 60px 116px 80px;
`;

const Description = styled.div`
	margin: 30px;
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

function LoginPage() {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const navigate = useNavigate();
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setValues((prevValues) => ({ ...prevValues, [name]: value }));
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { email, password } = values;
		try {
			await axios.post('/auth/login', { email, password });
			navigate('/');
		} catch (error) {
			alert('입력 정보가 정확하지 않습니다!');
		}
	}
	return (
		<Container>
			<Img src={logo} alt="logo" />
			<Form onSubmit={handleSubmit}>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="이메일"
					onChange={handleChange}
				/>
				<Input
					type="password"
					id="password"
					name="password"
					placeholder="비밀번호"
					onChange={handleChange}
				/>
				<Button type="submit">MustGoYour맛집 로그인</Button>
			</Form>

			<Description>
				회원이 아니신가요? <Link to="/signup">회원가입 하기</Link>
			</Description>
		</Container>
	);
}

export default LoginPage;
