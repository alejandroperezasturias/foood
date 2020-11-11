import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();
	const passwordConfirmationRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const signupUser = async () => {
		setLoading(true);
		await axios({
			method: 'POST',
			url: 'http://localhost:4001/auth/signup',
			data: {
				name: nameRef.current.value,
				email: emailRef.current.value,
				password: passwordConfirmationRef.current.value,
			},
		})
			.then(() => {
				setLoading(false);
				history.push('/logIn');
			})
			.catch((e) => {
				setLoading(false);
				setError(e.response.data);
			});
	};

	async function handleSignUp(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError('Passwords do not match');
		}
		try {
			await signupUser();
		} catch {
			setError('Failed to create an user');
			setLoading(false);
		}
	}
	return (
		<div className="sign-up-component flow-content">
			<h1 className="logo logo-sign-up">La Despensa</h1>
			<form onSubmit={handleSignUp} className={'form sign-up flow-content bg-accent-pink'}>
				<div>
					<h1>Sign Up</h1>
				</div>
				{error && (
					<div className={'error'}>
						<h4>{error}</h4>
					</div>
				)}
				<div >
					<label htmlFor="name">name</label>
					<input
						ref={nameRef}
						type="text"
						id="name"
						autoComplete="true"
						required
					></input>
				</div>
				<div >
					<label htmlFor="email">email</label>
					<input
						ref={emailRef}
						type="email"
						id="email"
						autoComplete="true"
						required
					></input>
				</div>
				<div >
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
					<label htmlFor="password-confirmation">Password Confirmation</label>
					<input
						ref={passwordConfirmationRef}
						type="password"
						id="password-confirmation"
						autoComplete="true"
						required
					></input>
				</div>
				<div>
					<button disabled={loading}>Sign Up</button>
				</div>
				<div className={'to-login'}>
					Already an user? <Link to="/logIn">Log In</Link>
				</div>
			</form>
		</div>
	);
}
