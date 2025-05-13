import React, { useEffect, useState, type FormEvent } from "react";
import Header from "../../components/Header/Header";
import styles from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getProfile, login, userActions } from "../../store/user.slice";

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export default function Login() {
    const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const {jwt, ErrorMessage} = useSelector((state: RootState) => state.user)

	useEffect(() => {
		if(jwt){
			navigate('/')
		}
	}, [jwt]);


	const sendLogin = async (email: string, password: string) => {
		dispatch(login({email, password}))
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	return (
		<div className={styles["login"]}>
			<Header>Вход</Header>
			{ErrorMessage && <div className={styles["error"]}>{ErrorMessage}</div>}
			<form className={styles["form"]} onSubmit={submit}>
				<div className={styles["field"]}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder="Email" />
				</div>
				<div className={styles["field"]}>
					<label htmlFor="password">Ваш пароль</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Пароль"
					/>
				</div>
				<Button appearence="big">Вход</Button>
			</form>
			<div className={styles["links"]}>
				<div>Нет акканута?</div>
				<Link to="/auth/register">Зарегистрироваться</Link>
			</div>
		</div>
	);
}
