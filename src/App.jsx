import { useState, useRef } from 'react'
import TodoForm from './components/TodoForm'
import Todos from './components/Todos'
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const refs = useRef([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      id: crypto.randomUUID(),
      content: todo,
      done: false
    }

    setTodos(todos.concat(newTodo))
    setIsAdding(true)
    setTodo('')
  }

  const handleToggleDone = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = {...todo, done: !todo.done}
        return updatedTodo
      } else { return todo }
    })
    setTodos(updatedTodos)
    setIsAdding(false)
  }

  const handleDeleteTodo = (id) => {
    let index
    todos.forEach((todo, i) => {
      if (todo.id === id) {
        index = i
        return
      }
    })
    if (refs.current[index]) {
      const el = refs.current[index]

      el.classList.add('fade-out')

      setTimeout(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id)

        el.classList.remove('fade-out')
        setTodos(updatedTodos)
        setIsAdding(false)
      }, 300)
    }
  }

  const handleTodoUp = (index) => {
    if (index > 0) {
      if (refs.current[index]) {
        const current = refs.current[index]
        const top = refs.current[index - 1]
        current.classList.add('todo-up')
        top.classList.add('todo-down')

        setTimeout(() => {
          const todosCopy = [...todos]
          const tmp = {...todosCopy[index - 1]}
          todosCopy[index - 1] = todosCopy[index]
          todosCopy[index] = tmp

          current.classList.remove('todo-up')
          top.classList.remove('todo-down')

          setTodos(todosCopy)
          setIsAdding(false)

        }, 500)
      }
    }
  }

  const handleTodoDown = (index) => {
    if (index !== todos.length - 1) {
      if (refs.current[index]) {
        const current = refs.current[index]
        const bottom = refs.current[index + 1]
        current.classList.add('todo-down')
        bottom.classList.add('todo-up')

        setTimeout(() => {
          const todosCopy = [...todos]
          const tmp = {...todosCopy[index + 1]}
          todosCopy[index + 1] = todosCopy[index]
          todosCopy[index] = tmp

          current.classList.remove('todo-down')
          bottom.classList.remove('todo-up')

          setTodos(todosCopy)
          setIsAdding(false)
        }, 500)
      }
    }
  }

  const handleDrop = (e) => {
     e.preventDefault()
     const draggedId = e.dataTransfer.getData('text')
     const droppedId = e.target.getAttribute('id')

     let draggedIndex, droppedIndex

     const todosCopy = [...todos]

     todosCopy.forEach((el, index) => {
       if (el.id === draggedId) {
         draggedIndex = index
       }
       if (el.id === droppedId) {
         droppedIndex = index
       }
     })

     const tmp = todosCopy[droppedIndex]
     todosCopy[droppedIndex] = todosCopy[draggedIndex]
     todosCopy[draggedIndex] = tmp

     setTodos(todosCopy)
  }

  return (
    <div className="w-4/5 mx-auto mt-10 py-5 max-w-3xl bg-sky-400">
      <TodoForm todo={todo} onChange={(e) => setTodo(e.target.value)} onSubmit={handleSubmit} />
      <Todos todos={todos} toggleDone={handleToggleDone} deleteTodo={handleDeleteTodo} todoUp={handleTodoUp} todoDown={handleTodoDown} refs={refs} isAdding={isAdding} handleDrop={handleDrop}/>
    </div>
  )
}

export default App
