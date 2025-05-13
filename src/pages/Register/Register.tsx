import React, { useEffect, type FormEvent } from 'react'
import styles from './Register.module.css'
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { register, userActions } from '../../store/user.slice';


export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
  name: {
		value: string;
	};
};


export default function Register() {
  const {jwt, ErrorMessage} = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()


  const sendRegister = async (email: string, name:string, password: string) => {
		await dispatch(register({email,name,password}))
	};

  useEffect(() => {
		if(jwt){
			navigate('/')
		}
	}, [jwt]);
  
  const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError())
		const target = e.target as typeof e.target & RegisterForm;
		const { email, name, password } = target;
		sendRegister(email.value, name.value, password.value);
	};



  return (
    <div className={styles["register"]}>
			<Header>Регистрация</Header>
			{ErrorMessage && <div className={styles["error"]}>{ErrorMessage}</div>}
			<form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
					<label htmlFor="name">Ваше имя</label>
					<Input id="name" name="name" placeholder="Имя" />
				</div>
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
				<Button appearence="big">Зарегистрироваться</Button>
			</form>
			<div className={styles["links"]}>
				<div>Уже имеется аккаунт?</div>
				<Link to="/auth/login">Войти</Link>
			</div>
		</div>
  )
}
