import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  // useRef,
  useState,
  type ReactNode,
} from 'react'
import { Todo } from '../entities/todo.entity'

interface TodoDTO {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface CreateContextData {
  todos: Todo[]
  isLoading: boolean
  forceUpdate: string
  forceUpdateFn: () => void
}

const TODOS_API = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

const TodosContext = createContext({} as CreateContextData)

interface TodosContextProps {
  children: ReactNode
}

export function TodosContextProvider({ children }: TodosContextProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [forceUpdate, setForceUpdate] = useState('')
  const todosRef = useRef<Todo[]>([])

  function forceUpdateFn() {
    setForceUpdate(Math.random().toString())
  }

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const todosDTO = await fetchTodos()
        todosRef.current = makeTodos(todosDTO)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  async function fetchTodos() {
    const response = await fetch(TODOS_API)
    return response.json()
  }

  function makeTodos(todosDTO: TodoDTO[]) {
    return todosDTO.map(Todo.create)
  }

  return (
    <TodosContext.Provider
      value={{ todos: todosRef.current, isLoading, forceUpdate, forceUpdateFn }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  return useContext(TodosContext)
}
