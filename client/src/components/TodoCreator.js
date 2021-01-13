import { useState } from 'react';

const initialState = { description: '', done: false };

export const TodoCreator = ({ onAdd }) => {
  const [todo, setTodo] = useState(initialState);

  const submitForm = event => {
    event.preventDefault();
    onAdd(todo).then(() => setTodo(initialState));
  };

  return (
    <form onSubmit={submitForm}>
      <h1>new todo</h1>
      <input
        name="description"
        value={todo.description}
        onChange={event =>
          setTodo(prev => ({ ...prev, description: event.target.value }))
        }
      />
      <input
        id="done"
        name="done"
        type="checkbox"
        value={todo.done}
        checked={todo.done}
        onChange={event =>
          setTodo(prev => ({ ...prev, done: event.target.checked }))
        }
      />
      <button type="submit">add</button>
    </form>
  );
};
