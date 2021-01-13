export const TodoList = ({ todos = [], onRemove, onUpdate, handleChange }) => {
  return (
    <>
      <h1>to do</h1>
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <input
            name="description"
            value={todo.description}
            type="text"
            onChange={event => {
              const newItem = {
                ...todo,
                description: event.target.value
              };

              handleChange(newItem, index);
            }}
            onBlur={() => onUpdate(todos[index])}
          />
          <input
            name="done"
            value={todo.done}
            checked={todo.done}
            type="checkbox"
            onChange={event => {
              const newItem = {
                ...todo,
                done: event.target.checked
              };

              handleChange(newItem, index);
            }}
            onBlur={() => onUpdate(todos[index])}
          />
          <button onClick={() => onRemove(todo.id, index)}>x</button>
        </div>
      ))}
    </>
  );
};
