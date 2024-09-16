import { useTodos } from '../context/todos-context'
import { TodosView } from '../view/todos-view'

export function TodoController() {
  const { isLoading, todos } = useTodos()
  return <TodosView todos={todos} isLoading={isLoading} />
}
