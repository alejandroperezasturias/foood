import React, { useContext } from 'react';
import './sortsearchAPI-style.scss';
import { RecipeContext } from '../../App.js';

export default function SortsearchAPI({ sortInView }) {
	const { handleSort, handleSortDirection } = useContext(RecipeContext);
	return (
		<div className={'sort-wrapper' + (sortInView ? ' active-sort' : '')}>
			<div className="select sort">
				<select
					onChange={(e) => handleSort(e.target.value)}
					name="sorty"
					className="sort"
				>
					<option value="meta-score">Score</option>
					<option value="popularity">Popularity</option>
					<option value="time">Cooking Time</option>
					<option value="healthiness">Healthiness</option>
					<option value="calories">Calories</option>
					<option value="protein">Protein</option>
					<option value="carbs">Carbs</option>
					<option value="energy">Energy</option>
				</select>
			</div>

			<div className="switch">
				<input
					onChange={(e) => {
						e.target.checked
							? handleSortDirection('asc')
							: handleSortDirection('desc');
					}}
					id="switch-1"
					type="checkbox"
					className="switch-input"
				></input>
				<label htmlFor="switch-1" className="switch-label">
					Ascending
				</label>
			</div>
		</div>
	);
}
