import axios from 'axios';
import { useEffect, useState } from 'react';

import { TodoList } from './components';
import { TodoCreator } from './components/TodoCreator';

const todosQuery = `
  query {
    todos {
      id
      description
      done
    }
  }
`;

const deleteTodoMutation = `
  mutation($id: Int) {
    deleted: deleteById(id: $id)
  }
`;

const addTodoMutation = `
  mutation($todoItem: TodoItemInput) {
    added: save(todoItem: $todoItem) {
      id
      description
      done
    }
  }
`;

const updateTodoMutation = `
  mutation($id: Int, $updates: TodoItemInput) {
    updateById(id: $id, updates: $updates)
  }
`;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios({
      method: 'POST',
      url: '/graphql',
      data: {
        query: todosQuery
      }
    }).then(({ data }) => setTodos(data.data.todos));
  }, []);

  const remove = (id, index) => {
    return axios({
      method: 'POST',
      url: '/graphql',
      data: {
        query: deleteTodoMutation,
        variables: { id: Number(id) }
      }
    }).then(({ data }) => {
      if (data.data.deleted) {
        setTodos(prevTodos => [
          ...prevTodos.slice(0, index),
          ...prevTodos.slice(index + 1)
        ]);
      }
    });
  };

  const add = newTodo => {
    return axios({
      method: 'POST',
      url: '/graphql',
      data: {
        query: addTodoMutation,
        variables: {
          todoItem: newTodo
        }
      }
    }).then(({ data }) => {
      setTodos(prev => [...prev, data.data.added]);
    });
  };

  const update = ({ id, description, done }) => {
    axios({
      method: 'POST',
      url: '/graphql',
      data: {
        query: updateTodoMutation,
        variables: {
          id: Number(id),
          updates: { description, done }
        }
      }
    });
  };

  const handleChange = (newItem, index) => {
    setTodos(prev => [
      ...prev.slice(0, index),
      newItem,
      ...prev.slice(index + 1)
    ]);
  };

  return (
    <>
      <TodoCreator onAdd={add} />
      <TodoList
        todos={todos}
        onRemove={remove}
        onUpdate={update}
        handleChange={handleChange}
      />
    </>
  );
}

export default App;
