import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TodoController } from '../pages/todos/container/todo-controller'
import { TodosContextProvider } from '../pages/todos/context/todos-context'

function TodosWithProvider() {
  return (
    <TodosContextProvider>
      <TodoController />
    </TodosContextProvider>
  )
}

const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: TodosWithProvider(),
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={routes} />
}
