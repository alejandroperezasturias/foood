import React, { useContext } from 'react';
import './recipe.scss';
import { RecipeContext } from '../App.js';

export default function Recipe({
	id,
	name,
	time,
	score,
	image,
	vegan,
	veryHealthy,
	veryPopular,
	vegetarian,
}) {
	const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

	return (
		<div className="recipe">
			<div className="my-recipe-image-wrapper">
				<div className={'recipe-component__image_my_recipes'}>
					<img src={image} alt={name}></img>
				</div>
			</div>
			<div className="my-recipe-info-wrapper">
				<div className={'recipe-API__header-my-recipes'}>
					<h1 className={'Title'}>{name}</h1>
				</div>
				<ul className={'recipe-component__caracteristics-my-recipe'}>
					{vegetarian && (
						<li>
							<i className="fas fa-carrot"> </i>
							<span> Vegetarian</span>
						</li>
					)}
					{vegan && (
						<li>
							<i className="fas fa-seedling"></i>
							<span> Vegan</span>
						</li>
					)}
					{veryHealthy && (
						<li>
							<i className="fas fa-weight"></i>
							<span> Very Healthy</span>
						</li>
					)}
					{veryPopular && (
						<li>
							<i className="fas fa-fire"></i>
							<span> Very Popular</span>
						</li>
					)}
				</ul>
				<div className={'recipe-component__time'}>
					<i className="fas fa-clock"></i>
					<span> {time}</span>
				</div>
				<div className={'recipe-component__score'}>
					<h3>{score}</h3>
					<span>score</span>
				</div>
				<div className={'recipe-component__buttons-my-recipe'}>
					<div className={'recipe-component__buttons-my-recipe_bottom-wrapper'}>
						<button
							className={'btn-edit'}
							onClick={() => handleRecipeSelect(id)}
						>
							Edit
						</button>
					</div>
					<div className={'recipe-component__buttons-my-recipe_bottom-wrapper'}>
						<button
							className={'btn-delete'}
							onClick={() => handleRecipeDelete(id)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
