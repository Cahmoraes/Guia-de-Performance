import { memo } from 'react'
import type { Todo } from '../entities/todo.entity'

export interface TodoListProps {
  todos: Todo[]
  anyFunction?: () => void
}

export function TodoList({ todos, anyFunction }: TodoListProps) {
  if (anyFunction) anyFunction()
  todos[0].toDate()
  return todos.map((todo) => <div key={todo.id}>{todo.title}</div>)
}

export const TodoListMemo = memo(TodoList)
