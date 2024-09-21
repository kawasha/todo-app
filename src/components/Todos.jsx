const Todo = ({ todo, toggleDone, number, deleteTodo, todoUp, todoDown, todosCount, refs, isAdding, handleDrop }) => {

  const handleDrag = (e) => {
    e.dataTransfer.setData('text', e.target.id)
  }

  return (
    <li draggable="true" onDragStart={(e) => handleDrag(e)} onDrop={(e) => handleDrop(e)} onDragOver={(e) => e.preventDefault()} ref={(el) => (refs.current[number - 1] = el)} className={`flex items-center border border-white p-2 mb-4 ${isAdding ? 'fade-in' : ''}`} id={todo.id}>
      <span className="w-5 h-5 flex items-center justify-center bg-gray-300 text-xs">{number}</span>
      <span className={`mr-auto p-1 ${todo.done ? 'line-through' : ''}`}>{todo.content}</span>
      <button onClick={() => toggleDone(todo.id)} className="bg-gray-300 p-1 w-20 mr-2">{ todo.done ? 'undone' : 'done' }</button>
      <button onClick={() => deleteTodo(todo.id)} className="bg-gray-300 p-1 w-20 mr-2">delete</button>
      <button onClick={() => todoUp(number - 1)} className={`${number - 1 === 0 ? 'bg-gray-400' : 'bg-gray-300'} p-1 w-10 mr-2`} disabled={number - 1 === 0 ? 'disabled' : null}>U</button>
      <button onClick={() => todoDown(number - 1)} className={`${number - 1 === todosCount - 1 ? 'bg-gray-400' : 'bg-gray-300'} p-1 w-10`} disabled={number - 1 === todosCount - 1 ? 'disabled' : null}>B</button>
    </li>
  )
}

const Todos = ({ todos, toggleDone, deleteTodo, todoUp, todoDown, refs, isAdding, handleDrop }) => {
  return (
    <div className="w-4/5 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Todos</h2>
      <ul>
        {
          isAdding ?
          todos.map((todo, index) => {
            if (index === todos.length - 1) {
              return <Todo key={todo.id} todo={todo} toggleDone={toggleDone} number={index + 1} deleteTodo={deleteTodo} todoUp={todoUp} todoDown={todoDown} todosCount={todos.length} refs={refs} handleDrop={handleDrop} isAdding={isAdding} />
            }
            return <Todo key={todo.id} todo={todo} toggleDone={toggleDone} number={index + 1} deleteTodo={deleteTodo} todoUp={todoUp} todoDown={todoDown} todosCount={todos.length} handleDrop={handleDrop} refs={refs} />
          })
          :
          todos.map((todo, index) => {
            return <Todo key={todo.id} todo={todo} toggleDone={toggleDone} number={index + 1} deleteTodo={deleteTodo} todoUp={todoUp} todoDown={todoDown} todosCount={todos.length} handleDrop={handleDrop} refs={refs} />
          })
        }
      </ul>
    </div>
  )
}

export default Todos
