import React from 'react'
import IngredientAPI from './IngredientAPI'
import { v4 as uuidv4 } from 'uuid'

export default function IngredienstsAPIList({ ingredients }) {
  return (
    <ul className={'details-component__ingredients__grid'}>
      {ingredients.map((ingredient) => {
        return <IngredientAPI key={uuidv4()} name={ingredient.original} />
      })}
    </ul>
  )
}
