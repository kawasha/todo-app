const TodoForm = ({ todo, onChange, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} className="w-4/5 mx-auto text-center pt-5">
      <input value={todo} onChange={(e) => onChange(e)} className="w-4/5 p-3 mr-3" type="text"/>
      <button className="bg-green-300 p-3">Add</button>
    </form>
  )
}

export default TodoForm
