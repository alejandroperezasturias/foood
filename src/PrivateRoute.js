import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RecipeContext } from './App';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { user } = useContext(RecipeContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				return user ? <Component {...props} /> : <Redirect to="/signUp" />;
			}}
		></Route>
	);
}
