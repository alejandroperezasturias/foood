import React, { useContext } from 'react';
import { RecipeContext } from '../App.js';

export default function RecipeAPI({ recipe }) {
	const {
		handleRecipeSelectIP,
		handleAddRecipeAPItoSavedOnes,
		recipes,
	} = useContext(RecipeContext);

	return (
			<div className="recipe-card bg-light flex">
				<div className={'dish-image'}>
					<img src={recipe.image} alt={recipe.title}></img>
				</div>
				<div className={'recipe-info flow-content'}>
					<div className={'title'}>
						<h1>{recipe.title}</h1>
					</div>
					<ul className={'caracteristics flex'}>
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

					<div className={'flex'}>
						<button onClick={() => handleAddRecipeAPItoSavedOnes(recipe.id)}>
							{recipes.find((r) => r.id === recipe.id) ? 'Added' : 'Add'}
						</button>
						<button
							onClick={() => handleRecipeSelectIP(recipe.id)}
							className={'btn-accent'}
						>
							Details
						</button>
					</div>
				</div>
				<div className={'score'}>
					<span>{recipe.spoonacularScore}</span>
					<span>score</span>
				</div>
				<div className={'time'}>
					<i className="fas fa-clock"></i>
					<span> {recipe.readyInMinutes}</span>
				</div>
			</div>

	);
}
