import React, { useContext } from 'react';
import { RecipeContext } from '../App.js';
import './saved.scss';

export default function Saved() {
	const { handleVisibility, visibilityAdded } = useContext(RecipeContext);

	return (
		<div
			style={visibilityAdded ? { display: 'flex' } : { display: 'none' }}
			className={'saved-wrapper'}
			onClick={handleVisibility}
		>
			<div className={'saved-box'}>
				<h3>
					Saved{' '}
					<span role="img" aria-label="emoji">
						&#128064;
					</span>
				</h3>
				<button onClick={handleVisibility}>&times;</button>
			</div>
		</div>
	);
}
