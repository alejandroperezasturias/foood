import React, { useContext } from 'react';
import './FilterSearchAPI.scss';
import { RecipeContext } from '../../App.js';

export default function FilterSearchAPI({ filterInView }) {
	const { handleCuisine, handleDiet, handlePlate } = useContext(RecipeContext);
	return (
		<div className={'filter-search-wrapper' + (filterInView ? ' active' : '')}>
			<div className="select">
				<select
					name="cusines"
					className="filter-cuisines"
					onChange={(e) => handleCuisine(e.target.value)}
				>
					<option value="">All</option>
					<option value="italian">Italian</option>

					<option value="thai">Thai</option>
					<option value="chinese">Chinese</option>
					<option value="caribbean">Caribbean</option>
					<option value="indian">Indian</option>
					<option value="mediterranean">Mediterranean</option>
					<option value="japanese">Japanese</option>
				</select>
			</div>
			<div className="select select-diet">
				<select
					name="diets"
					className="filter-diet"
					onChange={(e) => handleDiet(e.target.value)}
				>
					<option value="">All</option>
					<option value="vegetarian">Vegetarian</option>

					<option value="vegan">Vegan</option>
					<option value="percetarian">Percetarian</option>
					<option value="omnivore">Omnivore</option>
				</select>
			</div>
			<div className="select select-meal-type">
				<select
					name="meal-types"
					className="filter-meal"
					onChange={(e) => handlePlate(e.target.value)}
				>
					<option value="">All</option>
					<option value="main course">Main course</option>

					<option value="dessert">Dessert</option>
					<option value="salad">Salad</option>
					<option value="breakfast">Breakfast</option>
					<option value="snack">Snack</option>
				</select>
			</div>
		</div>
	);
}
