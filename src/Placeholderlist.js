import React from 'react'
import Placeholder from './placeholder'
import { v4 as uuidv4 } from 'uuid'

export default function Placeholderlist() {
  return (
    <div className={'recipe-API__list'}>
      {Array.apply(null, Array(8)).map((x) => (
        <Placeholder key={uuidv4()} />
      ))}
    </div>
  )
}
