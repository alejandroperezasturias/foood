import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../App';
import { useHistory } from 'react-router-dom';
import './userDashboard.scss';
import axios from 'axios';
import panda from '../avatar-images/debbie-molle-6DSID8Ey9-U-unsplash.jpg';
import pug from '../avatar-images/toshi-lySzv_cqxH8-unsplash.jpg';
import peace from '../avatar-images/peace.jpeg';
import moon from '../avatar-images/moon.jpeg';

export default function UserDashboard() {
	const {
		user,
		handleLogOut,
		handleApiCall,
		setQuery,
		userEmoji,
		setUserEmoji,
	} = useContext(RecipeContext);
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
		setQuery({ query: '', cuisine: '', diet: '', plate: '' });
		handleApiCall();
		history.push('./logIn');
	};

	const handleSelectUserEmoji = (e) => {
		setUserEmoji(e);
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
							className={'avatar-image-chosen'}
							src={userEmoji}
							alt="user"
						></img>
						<div className="avatar-chose-title">
							<h4>Chose Avatar</h4>
						</div>
						<div className={'avatar-wrapper'}>
							<button
								value={pug}
								className={'avatar-image'}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={pug} alt="pug"></img>
							</button>
							<button
								className={'avatar-image'}
								value={peace}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={peace} alt="peace"></img>
							</button>
							<button
								className={'avatar-image'}
								value={panda}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={panda} alt="panda"></img>
							</button>
							<button
								className={'avatar-image'}
								value={moon}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={moon} alt="moon"></img>
							</button>
						</div>
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
