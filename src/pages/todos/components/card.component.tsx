import { memo } from 'react'
import { useTodos } from '../context/todos-context'

function Card() {
  const { todos } = useTodos()
  return <h1>Card</h1>
}

export const CardComponent = memo(Card)
