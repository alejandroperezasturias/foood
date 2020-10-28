import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../App';
import { useHistory } from 'react-router-dom';
import './userDashboard.scss';
import axios from 'axios';

export default function UserDashboard() {
	const { user, handleLogOut, handleApiSearch } = useContext(RecipeContext);
	const [loading, setLoading] = useState(false);
	const [userPublicInfo, setuserPublicInfo] = useState({});
	const [error, setError] = useState();
	const history = useHistory();

	const getUserInfo = async () => {
		setLoading(true);
		await axios({
			method: 'GET',
			url: 'http://localhost:4001/auth/userInfo',
			headers: { 'auth-token': user },
		})
			.then((response) => {
				setuserPublicInfo(response.data);
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				setError(e.response.data);
			});
	};

	const logOut = () => {
		handleLogOut();
		// Setting the search to null
		handleApiSearch('');
		history.push('./logIn');
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<div className={'user-dashboard'}>
			{loading ? (
				<h1>Loading</h1>
			) : (
				<div className={'user-wrapper'}>
					<div className={'user-wrapper-component image'}>
						<img
							src="https://images.unsplash.com/photo-1600813390845-f35b9d49931a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80"
							alt="user-image"
						></img>
					</div>
					<div className={'user-wrapper-component name'}>
						<h3>{userPublicInfo.name}</h3>
					</div>
					<div className={'user-wrapper-component email'}>
						<h3>Email: {userPublicInfo.email}</h3>
					</div>
					<div className={'user-wrapper-component button'}>
						<button onClick={logOut}>Log Out</button>
					</div>
				</div>
			)}
			{error ? <h1>{error}</h1> : <></>}
		</div>
	);
}
