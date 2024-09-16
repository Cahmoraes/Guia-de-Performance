export interface CreateTodoDTO {
  userId: number
  id: number
  title: string
  completed: boolean
}

export class Todo {
  private _userId: number
  private _id: number
  private _title: string
  private _completed: boolean

  private constructor(props: CreateTodoDTO) {
    this._userId = props.userId
    this._id = props.id
    this._title = props.title
    this._completed = props.completed
  }

  static create(props: CreateTodoDTO): Todo {
    return new Todo(props)
  }

  get userId(): number {
    return this._userId
  }

  get id(): number {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get completed(): boolean {
    return this._completed
  }

  toDate() {
    return Date.now()
  }
}
