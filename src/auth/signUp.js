import React, { useRef, useState } from 'react';
import axios from 'axios';
import './signUp.scss';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();
	const passwordConfirmationRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	async function handleSignUp(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError('Passwords do not match');
		}
		try {
			setError('');
			setLoading(true);
			axios({
				method: 'POST',
				url: 'http://localhost:4001/auth/signup',
				data: {
					name: nameRef.current.value,
					email: emailRef.current.value,
					password: passwordConfirmationRef.current.value,
				},
			});
		} catch {
			setError('Failed to create an user');
		}
	}
	return (
		<div className="form-wrapper">
			<h1 className="logo">La Despensa</h1>
			<form onSubmit={handleSignUp}>
				<div>
					<h1>Sign Up</h1>
				</div>
				<div
					className={'Password-error'}
					style={error ? { display: 'flex' } : { display: 'none' }}
				>
					<h4>Something went wrong. Check your password and email.</h4>
				</div>

				<div>
					<label htmlFor="name">name</label>
					<input
						ref={nameRef}
						type="text"
						id="name"
						autoComplete="true"
						required
					></input>
				</div>
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
				<div>{/* Already an user? <Link to="/login">Log In</Link> */}</div>
			</form>
		</div>
	);
}
