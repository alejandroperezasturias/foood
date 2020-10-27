import React, { useContext } from 'react';
import { RecipeContext } from '../App.js';
import IngredientsAPIList from './IngredienstsAPIList';
import { v4 as uuidv4 } from 'uuid';
import './detailsRecipeAPI-style.scss';

export default function DetailsRecipeAPI({ recipe }) {
	const { handleCloseRecipeAPI, selectedRecipeAPI } = useContext(RecipeContext);
	return (
		<div className={'sectionWrapper'}>
			<div
				className={'details-component-wrapper'}
				style={selectedRecipeAPI ? { opacity: '1' } : { opacity: '0' }}
			>
				<div className={'details-component details-component__title'}>
					<h1>{recipe.title}</h1>
				</div>
				<div className={'details-component details-component__hero'}>
					<ul className={'details-component__list'}>
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
					<div className={'details-component__hero__image'}>
						<img src={recipe.image} alt={recipe.name}></img>
					</div>
				</div>
				{/* <div className={"details-component"}> */}
				<details className={'details-component details-component__ingredients'}>
					<summary>Ingredients</summary>
					<IngredientsAPIList ingredients={recipe.extendedIngredients} />
				</details>
				<details
					className={'details-component details-component__instructions'}
				>
					<summary>Instructions</summary>
					<ul className={'details-component__instructions__grid'}>
						{recipe.analyzedInstructions[0].steps.map((step, index) => {
							return (
								<div key={uuidv4()}>
									<h1>{index + 1} Step</h1>
									<li className={'details-component__instructions__grid__rows'}>
										{' '}
										{step.step}
									</li>
								</div>
							);
						})}
					</ul>
				</details>
				{/* </div> */}
				<button
					onClick={handleCloseRecipeAPI}
					className={'details-component__bottom bottom-close'}
				>
					&times;
				</button>
			</div>
		</div>
	);
}
