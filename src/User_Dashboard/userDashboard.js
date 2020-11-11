import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../App';
import { useHistory } from 'react-router-dom';
import './userDashboard.scss';
import axios from 'axios';

export default function UserDashboard() {
	const {
		user,
		handleLogOut,
		handleApiCall,
		setQuery,
		userEmoji,
		setUserEmoji,
		userAvatars,
	} = useContext(RecipeContext);
	const [loading, setLoading] = useState(false);
	const [avatarLoading, setAvatarLoading] = useState(false);
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

	const updateAvatar = async (avatar) => {
		setAvatarLoading(true);
		await axios({
			method: 'PUT',
			url: 'http://localhost:4001/auth/userInfo/update',
			headers: { 'auth-token': user },
			data: {
				avatar: avatar,
			},
		})
			.then(() => {
				setAvatarLoading(false);
			})
			.catch((e) => {
				setAvatarLoading(false);
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

	const handleSelectUserEmoji = async (e) => {
		setUserEmoji(userAvatars[e]);
		updateAvatar(userAvatars[e]);
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
								disabled={avatarLoading}
								value={'pug'}
								className={'avatar-image'}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={userAvatars['pug']} alt="pug"></img>
							</button>
							<button
								disabled={avatarLoading}
								className={'avatar-image'}
								value={'peace'}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={userAvatars['peace']} alt="peace"></img>
							</button>
							<button
								disabled={avatarLoading}
								className={'avatar-image'}
								value={'panda'}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={userAvatars['panda']} alt="panda"></img>
							</button>
							<button
								disabled={avatarLoading}
								className={'avatar-image'}
								value={'moon'}
								onClick={(e) => handleSelectUserEmoji(e.target.value)}
							>
								<img src={userAvatars['moon']} alt="moon"></img>
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
