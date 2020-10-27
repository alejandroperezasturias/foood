import React, { useContext } from 'react';
import { RecipeContext } from '../App.js';

export default function RecipeAPI({ recipe }) {
	const {
		handleRecipeSelectIP,
		handleAddRecipeAPItoSavedOnes,
		recipes,
	} = useContext(RecipeContext);

	return (
		<div>
			<div className="recipe-API">
				<div className={'recipe-component recipe-component__image'}>
					<img src={recipe.image} alt={recipe.title}></img>
				</div>
				<div className={'recipe-component recipe-component__info'}>
					<div className={'recipe-API__header'}>
						<h1>{recipe.title}</h1>
					</div>
					<ul className={'recipe-component__caracteristics'}>
						{recipe.vegetarian && (
							<li>
								<i className="fas fa-carrot"> </i>
								<span> Vegetarian</span>
							</li>
						)}
						{recipe.vegan && (
							<li>
								<i className="fas fa-seedling"></i>
								<span> Vegan</span>
							</li>
						)}
						{recipe.veryHealthy && (
							<li>
								<i className="fas fa-weight"></i>
								<span> Very Healthy</span>
							</li>
						)}
						{recipe.veryPopular && (
							<li>
								<i className="fas fa-fire"></i>
								<span> Very Popular</span>
							</li>
						)}
					</ul>

					<div className={'recipe-component__buttons'}>
						<button
							onClick={() => handleAddRecipeAPItoSavedOnes(recipe.id)}
							className={'btn-add'}
						>
							{recipes.find((r) => r.id === recipe.id) ? 'Added' : 'Add'}
						</button>
						<button
							onClick={() => handleRecipeSelectIP(recipe.id)}
							className={'btn-more'}
						>
							Details
						</button>
					</div>
				</div>
				<div className={'recipe-component__score'}>
					<h3>{recipe.spoonacularScore}</h3>
					<span>score</span>
				</div>
				<div className={'recipe-component__time'}>
					<i className="fas fa-clock"></i>
					<span> {recipe.readyInMinutes}</span>
				</div>
			</div>
		</div>
	);
}
