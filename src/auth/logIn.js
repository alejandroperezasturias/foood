import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import './signUp.scss';
import { RecipeContext } from '../App';
import { useHistory, Link } from 'react-router-dom';

export default function LogIn() {
	const { handleSetuser } = useContext(RecipeContext);
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const logInUser = async () => {
		setLoading(true);
		await axios({
			method: 'POST',
			url: 'http://localhost:4001/auth/login',
			data: {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			},
		})
			.then((response) => {
				setLoading(false);
				handleSetuser(response.data);
				history.push('/findRecipes');
			})
			.catch((e) => {
				setLoading(false);
				setError(e.response.data);
			});
	};

	async function handleLogIn(e) {
		e.preventDefault();

		try {
			await logInUser();
		} catch {
			setError('Failed to LogIn');
			setLoading(false);
		}
	}
	return (
		<div className="form-wrapper">
			<h1 className="logo">La Despensa</h1>
			<form onSubmit={handleLogIn}>
				<div>
					<h1>Log In</h1>
				</div>
				{error && (
					<div className={'Password-error'}>
						<h4>{error}</h4>
					</div>
				)}

				<div>
					<label htmlFor="email">email</label>
					<input
						ref={emailRef}
						type="email"
						id="email"
						autoComplete="true"
						required
					></input>
				</div>
				<div>
					<label htmlFor="password">password</label>
					<input
						ref={passwordRef}
						type="password"
						id="password"
						autoComplete="true"
						required
					></input>
				</div>
				<div>
					<button disabled={loading}>Log In</button>
				</div>
				<div className={'to-login'}>
					Already an user? <Link to="/signUp">Sign Up</Link>
				</div>
			</form>
		</div>
	);
}
