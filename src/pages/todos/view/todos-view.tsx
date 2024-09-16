import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import { Todo } from '../entities/todo.entity'
import { CardComponent } from '../components/card.component'
import { TodoList, TodoListMemo } from '../components/todo-list'
import { useTodos } from '../context/todos-context'

export interface TodosViewProps {
  todos: Todo[]
  isLoading: boolean
}

function makeTodoByQuantity(aNumber: number) {
  return [...Array(aNumber)].map((_, index) =>
    Todo.create({
      id: index,
      title: `Todo ${index}`,
      completed: index % 2 === 0,
      userId: index,
    }),
  )
}

const QUANTITY_OF_TODOS = 5

export function TodosView({ todos }: TodosViewProps) {
  const { forceUpdateFn } = useTodos()
  const [value, setValue] = useState('')
  const todoListInMemory = useMemo(
    () => makeTodoByQuantity(QUANTITY_OF_TODOS),
    [],
  )
  const anyFunction = useCallback(() => {}, [])

  // useCallback
  const log = () => console.log(value)

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])

  useEffect(() => {
    console.log('useEffect: DOM updated')
  }, [])

  console.log('Rendering Component')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
    log()
    forceUpdateFn()
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input type="text" value={value} onChange={handleChange} />
      </div>
      {/* <CardComponent /> */}
      <h3>TodoListMemo</h3>
      <TodoListMemo todos={todos} />
      <hr />
      {/* <h3>TodoList</h3>
      <TodoList todos={todos} /> */}
      <hr />
      <h3>TodoListInMemory</h3>
      <TodoListMemo todos={todoListInMemory} anyFunction={anyFunction} />
    </div>
  )
}
